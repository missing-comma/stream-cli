import { AkheromOptions } from '~/domain';
import { GetWritableWidth } from '~/data/use-cases/get-writable-width';
import { SpreadMessagesInRowsSpreadSingleRow } from '~/data/use-cases/spread-messages-in-row/helpers/spread-single-row';
import { SpreadMessagesInRowsSpreadSingleNonIgnorableRow } from '~/data/use-cases/spread-messages-in-row/helpers/spread-single-non-ignorable-row';
import { makeASCIIHandler } from '~/main/factories/ascii';
import { SpreadMessagesInRows } from '~/data/use-cases/spread-messages-in-row';

export const makeSpreadMessagesInRows = (options: AkheromOptions) => {
	const asciiHandler = makeASCIIHandler();
	const spreadSingle = new SpreadMessagesInRowsSpreadSingleRow(
		new SpreadMessagesInRowsSpreadSingleNonIgnorableRow(),
		asciiHandler,
		asciiHandler,
	);

	return new SpreadMessagesInRows(new GetWritableWidth(options), spreadSingle);
};
