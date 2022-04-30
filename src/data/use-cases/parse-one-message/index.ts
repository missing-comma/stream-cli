import { IParseOneAkheromMessage } from '~/data/protocols';
import { AkheromMessageLike } from '~/domain';

export class ParseOneAkheromMessage implements IParseOneAkheromMessage {
	parse = (message: AkheromMessageLike): string => {
		if (typeof message !== 'string') return String(message);
		return message.replace(/\u001b\[.*?m/g, '');
	};
}
