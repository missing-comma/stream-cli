import { IIsASCIIChar, IReplaceASCIIChar } from '~/data/protocols';

export class ASCIIHandler implements IIsASCIIChar, IReplaceASCIIChar {
	match = (char: string): boolean => {
		return !!char.match(/\u001b\[.*?m/);
	};
	replace = (char: string, replacer: IReplaceASCIIChar.Replacer): string => {
		return char.replace(/(\u001b\[.*?m)/g, replacer as any);
	};
}
