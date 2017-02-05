const path = require('path');
const webpack = require('webpack');

const isProd = (process.env.NODE_ENV === 'production');

const vendorChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
	name: 'vendor',
	minChunks: Infinity
});

module.exports = {
	entry: {
		vendor: ['jquery', 'tether', 'bootstrap', 'react', 'react-dom', 'react-router', 'moment', 'lodash'],
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
	},
	resolve: {
		alias: {
			'app': path.join(process.cwd(), 'src')
		}
	},
	plugins: [vendorChunkPlugin]
};