import { IGetWritableWidth } from '~/data/protocols';
import { AkheromOptions } from '~/domain';

export class GetWritableWidth implements IGetWritableWidth {
	constructor(private readonly options: AkheromOptions) {}

	get = (): number => {
		const width = this.getInitialWidth();
		return width;
	};

	private getInitialWidth = (): number => {
		if (typeof this.options.width === 'string') {
			return process.stdout.columns - 2;
		} else {
			return this.options.width;
		}
	};
}
