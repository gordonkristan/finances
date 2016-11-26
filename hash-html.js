const fs = require('fs');

const files = fs.readdirSync('dist');
const appFile = files.find((name) => {
	return (/app\.[a-f0-9]+\.js/i).test(name);
});

const hash = appFile.match(/app\.([a-f0-9]+)\.js/i)[1];

const htmlContents = fs.readFileSync('dist/index.html', 'utf8');
const newContents = htmlContents.replace(/app\.js/, `app.${hash}.js`);
fs.writeFileSync('dist/index.html', newContents);