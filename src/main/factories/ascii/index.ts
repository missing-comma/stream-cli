import { IIsASCIIChar, IReplaceASCIIChar } from '~/data/protocols';
import { ASCIIHandler } from '~/data/use-cases/ascii';

export const makeASCIIHandler = () => new ASCIIHandler();
