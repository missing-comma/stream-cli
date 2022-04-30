const cp = require('child_process');
const fs = require('fs');

const omit = (source, ...keys) => {
	const obj = { ...source };
	keys.forEach((key) => {
		delete obj[key];
	});
	return obj;
};

const run = (command) => cp.execSync(command, { stdio: 'inherit' });

const copy = (file) => {
	if (!fs.existsSync(file)) return;
	fs.copyFileSync(file, `./deploy/${file}`);
};

const updateJSON = (updator) => {
	const packageJSON = require('../package.json');
	fs.writeFileSync('./deploy/package.json', JSON.stringify(updator(packageJSON), null, 2));
};

copy('.npmrc');
copy('yarn.lock');

updateJSON((json) => {
	return {
		name: json.name,
		version: json.version,
		main: './index.js',
		description: json.description,
		...omit(json, 'scripts', 'devDependencies', 'version', 'name', 'description'),
	};
});

process.chdir('./deploy');
run('npm publish --access public');
