import chalk from 'chalk';
import { Akherom, IAkherom } from '@missing-comma/akherom';

class Tracker {
	private curr: number = 0;
	private readonly total: number = 10;

	track = (akherom: IAkherom) => {
		const frequency = 200;
		const print = (onIter: () => void) => {
			const interval = setInterval(() => {
				const a = '='.repeat(Math.max(this.curr - 1, 0)) + '>';
				const b = ''; //'-'.repeat(Math.max(this.total - this.curr, 0));

				akherom.log([chalk.green(a) + chalk.white(b)]);
				onIter();

				if (this.curr > this.total || this.curr < 0) {
					clearInterval(interval);
				}
			}, frequency);
		};
		print(() => this.curr++);
		setTimeout(() => {
			print(() => this.curr--);
		}, frequency * (this.total + 1));
	};
}

function main() {
	const akherom = new Akherom({ width: 11 });
	const tracker = new Tracker();

	// let value = 0;
	// setInterval(() => {
	// 	value += 1;
	// 	const str = `Esse é um belo exemplo dessa porcaria funcionando = ${value}`;
	// 	akherom.log([str, chalk.red(str), chalk.green(str), chalk.blue(str)]);
	// }, 1000);

	tracker.track(akherom);
}

main();
