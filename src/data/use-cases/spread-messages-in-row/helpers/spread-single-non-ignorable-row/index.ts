import {
	ISpreadMessagesInRowsSpreadSingleNonIgnorableRow,
	SpreadMessagesInRowsAccumulator as Accumulator,
} from '~/data/use-cases/spread-messages-in-row/protocols';

export class SpreadMessagesInRowsSpreadSingleNonIgnorableRow
	implements ISpreadMessagesInRowsSpreadSingleNonIgnorableRow
{
	public spreadNonIgnorable = (acc: Accumulator, part: string, maxRowWidth: number): void => {
		const length = acc.length + part.length;
		const multiplier = Math.ceil(length / maxRowWidth);
		let currentRowPart = part;

		Array.from({ length: multiplier }).forEach(() => {
			const end = maxRowWidth - acc.length;
			const [before, after] = this.splitAt(currentRowPart, end);

			currentRowPart = after;
			acc.appendCurrentRow(before);

			if (acc.length >= maxRowWidth) {
				acc.commitCurrentRow();
			}
		});
	};

	private splitAt = (str: string, index: number) => {
		return [str.substring(0, index), str.substring(index)];
	};
}
