import { AkheromRow } from '~/data/entities';
import { AkheromMessageLike } from '~/domain';

export interface ISpreadMessagesInRows {
	spread(messages: AkheromMessageLike | AkheromMessageLike[]): string[];
}
