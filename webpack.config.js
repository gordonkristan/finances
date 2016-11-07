const path = require('path');

module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
		path: './public',
		filename: '[name].js',
		publicPath: '/'
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel' }
		]
	}
};