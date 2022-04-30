import { AkheromOptions } from '~/domain';

export interface IAssignDefaultOptions {
	assign(options: AkheromOptions.Model): AkheromOptions;
}
