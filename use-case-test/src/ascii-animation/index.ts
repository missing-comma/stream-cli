import { Akherom } from '@missing-comma/akherom';
import frames from './frames';

function main() {
	const akherom = new Akherom({ width: 'auto' });

	return new Promise((r) => {
		let i = 0;
		const interval = setInterval(() => {
			i = (i + 1) % frames.length;
			const frame = frames[i];
			akherom.log(frame + '\n');
		}, 59);
	});
}

main();
