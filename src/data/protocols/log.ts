import { AkheromMessageLike } from '~/domain';

export interface IAkheromLog {
	log(message: AkheromMessageLike | AkheromMessageLike[]): void;
}
