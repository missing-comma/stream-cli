import { IAkherom, AkheromMessageLike, AkheromOptions } from '~/domain';
import { makeAssignDefaultOptions } from '~/main/factories/assign-default-options';
import { makeCliAkheromLog } from '~/main/factories/log';

type Akherom = { new (options: AkheromOptions.Model): IAkherom };

export const makeAkheromClass = (): Akherom => {
	const defaultOptions = makeAssignDefaultOptions();

	return class Akherom implements IAkherom {
		public readonly options: Readonly<AkheromOptions>;
		public log: (message: AkheromMessageLike | AkheromMessageLike[]) => void;

		constructor(options: AkheromOptions.Model) {
			this.options = defaultOptions.assign(options);

			this.log = makeCliAkheromLog(this.options).log;
		}
	};
};
