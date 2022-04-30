import { SpreadMessagesInRowsSpreadSingleRow } from './index';
import { SpreadMessagesInRowsSpreadSingleNonIgnorableRow } from '~/data/use-cases/spread-messages-in-row/helpers/spread-single-non-ignorable-row';
import { IReplaceASCIIChar } from '~/data/protocols';

const makeSut = () => {
	const nonIgnorableSpread = new SpreadMessagesInRowsSpreadSingleNonIgnorableRow();
	const asciiHandler = {
		match: (char: string): boolean => {
			return !!char.match(/\d/);
		},
		replace: (char: string, replacer: IReplaceASCIIChar.Replacer): string => {
			return char.replace(/(\d)/g, replacer as any);
		},
	};
	const sut = new SpreadMessagesInRowsSpreadSingleRow(nonIgnorableSpread, asciiHandler, asciiHandler);
	return { sut, stubs: { nonIgnorableSpread } };
};

describe('SpreadMessagesInRowsSpreadSingleRow Unit Test', () => {
	test('should properly spread while ignoring proper characters', () => {
		const { sut } = makeSut();
		const rows = sut.spreadSingle('aaa0bbb', 6);

		expect(rows).toStrictEqual(['aaa0bbb']);
	});

	test('split ignorable should return proper value', () => {
		const { sut } = makeSut();
		const rows = sut.splitIgnorable('aaa0bbb');

		expect(rows).toStrictEqual(['aaa', '0', 'bbb']);
	});

	test('matchIgnorePattern should return proper value', () => {
		const { sut } = makeSut();

		expect(sut.matchIgnorePattern('aaa')).toBe(false);
		expect(sut.matchIgnorePattern('0')).toBe(true);
		expect(sut.matchIgnorePattern('bbb')).toBe(false);
	});

	test('should only invoke nonIgnorableSpread on nonIgnorablePattern matches', () => {
		const { sut, stubs } = makeSut();

		const spreadNonIgnorableSpy = jest.spyOn(stubs.nonIgnorableSpread, 'spreadNonIgnorable');

		sut.spreadSingle('aaa0bbb', 6);

		expect(spreadNonIgnorableSpy).toHaveBeenCalledTimes(2);
		expect(spreadNonIgnorableSpy).toHaveBeenCalledWith(expect.any(Object), 'aaa', 6);
		expect(spreadNonIgnorableSpy).toHaveBeenCalledWith(expect.any(Object), 'bbb', 6);
	});
});
