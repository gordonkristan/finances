const path = require('path');

const isProd = (process.env.NODE_ENV === 'production');

module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
		path: (isProd ? './dist' : './public'),
		filename: (isProd ? '[name].[chunkhash].js' : '[name].js'),
		publicPath: '/'
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel' }
		]
	}
};