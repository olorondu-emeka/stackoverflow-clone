const fs = require('fs');
const { IGNORE } = require('sequelize/types/lib/index-hints');

const handleFile = (_, data) => {
	let text;

	const finalString = data
		.replace(/ /g, '')
		.split('\n')
		.filter(item => {
			return item.trim() !== '';
		})
		.map(item => {
			return item.split('=')[0];
		});

	text = `${finalString.join('\n')}\n`;

	fs.writeFile('env.sample', text, err => {
		if (err) console.log(`😡 ${err.message}`);
		else console.log('😃 env synced by prof G!');
	});
};

fs.readFile('.env', 'utf-8', handleFile);
