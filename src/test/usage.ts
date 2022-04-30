import chalk from 'chalk';
import '../main/setup';
import { Akherom } from '../main/factories';

function main() {
	const akherom = new Akherom({});

	let value = 0;

	setInterval(() => {
		value += 1;
		const str = `Esse é um belo exemplo dessa porcaria funcionando = ${value}`;
		akherom.log([str, chalk.red(str), chalk.green(str), chalk.blue(str)]);
	}, 1000);
}

main();
