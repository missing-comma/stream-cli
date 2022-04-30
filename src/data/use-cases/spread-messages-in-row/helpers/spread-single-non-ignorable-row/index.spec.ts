import { SpreadMessagesInRowsSpreadSingleNonIgnorableRow } from './index';
import { SpreadMessagesInRowsAccumulator as Accumulator } from '~/data/use-cases/spread-messages-in-row/protocols';

const makeSut = () => {
	const sut = new SpreadMessagesInRowsSpreadSingleNonIgnorableRow();
	return { sut };
};

const makeAccumulator = (currentRow: string = ''): Accumulator => {
	const acc = new Accumulator();
	acc.appendCurrentRow(currentRow);
	return acc;
};
describe('SpreadMessagesInRowsSpreadSingleNonIgnorableRow Unit Test', () => {
	test('should properly spread while ignoring proper characters', () => {
		const { sut } = makeSut();

		const acc = makeAccumulator();
		sut.spreadNonIgnorable(acc, 'aaabbb', 3);

		expect(acc.rows).toStrictEqual(['aaa', 'bbb']);
	});

	test('should properly spread while ignoring proper characters when accumulator is filled', () => {
		const { sut } = makeSut();

		const acc = makeAccumulator();
		acc.rows.push('aaa');
		sut.spreadNonIgnorable(acc, 'bbb', 3);

		expect(acc.rows).toStrictEqual(['aaa', 'bbb']);
	});

	test('should properly spread while ignoring proper characters when accumulator is filled with partial row', () => {
		const { sut } = makeSut();

		const acc = makeAccumulator('xx');
		sut.spreadNonIgnorable(acc, 'aaabbb', 3);

		expect(acc.rows).toStrictEqual(['xxa', 'aab']);
		acc.currentRow = 'bb';
	});
});
