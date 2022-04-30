import { IGetMessagesLength } from '~/data/protocols';
import { AkheromMessageLike } from '~/domain';

export class CliGetMessagesLength implements IGetMessagesLength {
	get = (messages: AkheromMessageLike[]): number[] => {
		return messages.map(this.getOne);
	};

	getOne = (message: AkheromMessageLike): number => {
		return String(message).length;
	};
}
