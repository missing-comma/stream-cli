import { CliAkheromLog } from '~/data/use-cases/log';
import { AkheromOptions } from '~/domain';
import { makeSpreadMessagesInRows } from '~/main/factories/spread-messages-in-row';

export const makeCliAkheromLog = (options: AkheromOptions) => {
	return new CliAkheromLog(options, makeSpreadMessagesInRows(options));
};
