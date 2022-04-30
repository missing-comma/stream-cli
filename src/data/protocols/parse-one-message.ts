import { AkheromMessageLike } from '~/domain';

export interface IParseOneAkheromMessage {
	parse(message: AkheromMessageLike): string;
}
