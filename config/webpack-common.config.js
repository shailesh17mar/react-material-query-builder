'use strict';

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let ProvidePlugin = require('webpack').ProvidePlugin;

module.exports = {
    module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					use: 'babel-loader',
					exclude: /node_modules/
				},
				{
					test: /\.scss/,
					use: ExtractTextPlugin.extract({
						use: ['css-loader', 'sass-loader']
					})
				},
				{
					test: /\.css$/,
					use: [
						"style-loader",
						{
							loader: "css-loader",
							options: {
								modules: true, // default is false
								sourceMap: true,
								importLoaders: 1,
								localIdentName: "[name]--[local]--[hash:base64:8]"
							}
						},
						{
							loader: "postcss-loader",
							options:{
								plugins: [
									require('postcss-cssnext')
								]
							}
						}
					]
				}
			],
		},
	resolve: {
		extensions: ['.js', '.jsx', '.scss']
	},

	plugins: [
		new ExtractTextPlugin('query-builder.css')
	],

	stats: {
		maxModules: 0
	}
};
