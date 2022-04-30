import { IAkheromLog, IGetWritableWidth } from '~/data/protocols';
import { AkheromMessageLike, AkheromOptions } from '~/domain';

export class CliAkheromLog implements IAkheromLog {
	constructor(private readonly options: AkheromOptions, private readonly writableWidth: IGetWritableWidth) {}

	log = (message: AkheromMessageLike | AkheromMessageLike[]): void => {
		const messages = Array.isArray(message) ? message : [message];

		const width = this.writableWidth.get();
	};
}
