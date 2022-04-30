import { AkheromMessageLike } from '~/domain';

export interface IGetMessagesLength {
	get(messages: AkheromMessageLike[]): number[];
}
