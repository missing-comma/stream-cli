import chalk from 'chalk';
import { Akherom, IAkherom } from '@missing-comma/akherom';

const wait = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function* track() {}

class Tracker {
	private curr: number = 0;
	private readonly total: number = 10;

	track = (akherom: IAkherom) => {
		const frequency = 200;
		let interval: NodeJS.Timer | null = null;
		const print = (onIter: () => void) => {
			interval !== null && clearInterval(interval);
			interval = setInterval(() => {
				let a = '='.repeat(Math.max(this.curr - 1, 0)) + '>';
				let b = '-'.repeat(Math.max(this.total - this.curr - 1, 0));
				if (this.curr <= 0) {
					a = b = '';
				}

				akherom.log([chalk.green(a) + chalk.white(b)]);
				onIter();

				if (this.curr > this.total || this.curr < 0) {
					interval !== null && clearInterval(interval);
				}
			}, frequency);
		};
		print(() => this.curr++);
		setTimeout(() => {
			const recurr = () => --this.curr;
			recurr();
			print(recurr);
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
