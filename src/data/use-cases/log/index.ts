import { IAkheromLog, ISpreadMessagesInRows } from '~/data/protocols';
import { AkheromMessageLike, AkheromOptions } from '~/domain';

export class CliAkheromLog implements IAkheromLog {
	private prevNumberOfLines: number = -1;

	constructor(private readonly options: AkheromOptions, private readonly inRows: ISpreadMessagesInRows) {}

	log = (message: AkheromMessageLike | AkheromMessageLike[]): void => {
		const rows = this.inRows.spread(message);

		if (this.prevNumberOfLines > 0) {
			new Array({ length: this.prevNumberOfLines }).forEach(() => {
				process.stdout.moveCursor(0, -this.prevNumberOfLines); // up N lines
				process.stdout.clearLine(1); // from cursor to end
			});
		}
		rows.forEach((row) => console.log(row));
		this.prevNumberOfLines = rows.length;
	};
}
