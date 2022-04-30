import { IIsASCIIChar, IReplaceASCIIChar } from '~/data/protocols';
import {
	ISpreadMessagesInRowsSpreadSingleNonIgnorableRow,
	ISpreadMessagesInRowsSpreadSingleRow,
	SpreadMessagesInRowsAccumulator as Accumulator,
} from '~/data/use-cases/spread-messages-in-row/protocols';

export class SpreadMessagesInRowsSpreadSingleRow implements ISpreadMessagesInRowsSpreadSingleRow {
	constructor(
		private readonly ignorableRowSpread: ISpreadMessagesInRowsSpreadSingleNonIgnorableRow,
		private readonly isASCII: IIsASCIIChar,
		private readonly replaceASCII: IReplaceASCIIChar,
	) {}

	public spreadSingle = (row: string, maxRowWidth: number): string[] => {
		const parts = this.splitIgnorable(row);

		const acc = new Accumulator();

		const callbackFn = (part: string) => {
			if (this.matchIgnorePattern(part)) {
				acc.currentRow += part;
			} else {
				this.ignorableRowSpread.spreadNonIgnorable(acc, part, maxRowWidth);
			}
		};

		parts.forEach(callbackFn);
		acc.commitCurrentRow();
		return acc.rows;
	};

	public splitIgnorable = (row: string): string[] => {
		return this.replaceASCII.replace(row, '__BREAK__$1__BREAK__').split('__BREAK__');
	};

	public matchIgnorePattern = (char: string) => {
		return this.isASCII.match(char);
	};
}
