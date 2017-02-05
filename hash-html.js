const fs = require('fs');

const files = fs.readdirSync('dist');

const vendorFile = files.find((name) => {
	return (/vendor\.[a-f0-9]+\.js/i).test(name);
});
const appFile = files.find((name) => {
	return (/app\.[a-f0-9]+\.js/i).test(name);
});

const vendorHash = vendorFile.match(/vendor\.([a-f0-9]+)\.js/i)[1];
const appHash = appFile.match(/app\.([a-f0-9]+)\.js/i)[1];

const htmlContents = fs.readFileSync('dist/index.html', 'utf8');
const newContents = htmlContents.
	replace(/vendor\.js/, `vendor.${vendorHash}.js`).
	replace(/app\.js/, `app.${appHash}.js`);

fs.writeFileSync('dist/index.html', newContents);