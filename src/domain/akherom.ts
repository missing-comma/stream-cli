import { AkheromMessageLike } from '~/domain/message-like';
import { AkheromOptions } from '~/domain/options';

export interface IAkherom {
	readonly options: AkheromOptions;

	log(message: AkheromMessageLike | AkheromMessageLike[]): void;
}
