import { IAssignDefaultOptions } from '~/data/protocols';
import { AkheromOptions } from '~/domain';

export class AssignDefaultOptions implements IAssignDefaultOptions {
	assign = (options: AkheromOptions.Model): AkheromOptions => {
		return {
			width: 'auto',
			...options,
		};
	};
}
