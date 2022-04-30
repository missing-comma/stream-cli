import { ParseOneAkheromMessage } from './index';
import chalk from 'chalk';

const makeSut = () => {
	const sut = new ParseOneAkheromMessage();
	return { sut };
};

describe('ParseOneAkheromMessage Unit Test', () => {
	test('should remove ascii characters', () => {
		const { sut } = makeSut();

		const rawMessage = 'batata';
		const message = chalk.red(rawMessage);
		const parsedMessage = sut.parse(message);

		expect(message).not.toBe(rawMessage);

		expect(parsedMessage.length).toBe(rawMessage.length);
		expect(parsedMessage).toBe(rawMessage);
	});
});
