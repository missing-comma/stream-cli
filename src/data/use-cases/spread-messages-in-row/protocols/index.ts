export interface ISpreadMessagesInRowsSpreadSingleRow {
	spreadSingle(row: string, maxRowWidth: number): string[];
}

export interface ISpreadMessagesInRowsSpreadSingleNonIgnorableRow {
	spreadNonIgnorable(acc: SpreadMessagesInRowsAccumulator, row: string, maxRowWidth: number): void;
}

export class SpreadMessagesInRowsAccumulator {
	public readonly rows: string[] = [];
	public currentRow: string = '';
	public length: number = 0;

	public commitCurrentRow = () => {
		if (this.currentRow.length > 0) {
			this.rows.push(this.currentRow);
			this.currentRow = '';
			this.length = 0;
		}
	};

	public appendCurrentRow = (row: string, length: number = row.length) => {
		this.currentRow += row;
		this.length += length;
	};
}
