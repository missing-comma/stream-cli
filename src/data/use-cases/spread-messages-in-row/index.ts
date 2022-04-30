import { ISpreadMessagesInRows, IGetWritableWidth } from '~/data/protocols';
import { AkheromMessageLike } from '~/domain';
import { ISpreadMessagesInRowsSpreadSingleRow } from '~/data/use-cases/spread-messages-in-row/protocols';

export class SpreadMessagesInRows implements ISpreadMessagesInRows {
	constructor(
		private readonly width: IGetWritableWidth,
		// private readonly parse: IParseOneAkheromMessage,
		private readonly spreadSingle: ISpreadMessagesInRowsSpreadSingleRow,
	) {}

	spread = (messages: AkheromMessageLike | AkheromMessageLike[]): string[] => {
		const message = Array.isArray(messages) ? this.joined(messages) : String(messages);
		const width = this.width.get();
		const rows: string[] = [];
		const baseRows: string[] = message.split('\n');
		baseRows.forEach((row) => {
			rows.push(...this.spreadSingle.spreadSingle(row, width));
		});

		return rows;
	};

	// private parseRow = (message: string): AkheromRow => {
	// 	const metadata = this.parse.parse(message);
	// 	return {
	// 		metadata,
	// 		length: metadata.length,
	// 		content: message,
	// 	};
	// };

	private joined = (messages: AkheromMessageLike[]): string => {
		return messages.join('\n');
	};
}
