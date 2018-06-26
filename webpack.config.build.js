const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {

    mode: 'production',

    plugins: [
        new CleanWebpackPlugin(['dist/*']),
        new webpack.optimize.SplitChunksPlugin({
            filename: 'index.js',
            name: 'reign',
            automaticNameDelimiter: '-',
            chunks: 'all',
            minChunks: 2,
            runtimeChunk: true
        })
    ],
    output: {
        filename: '[name]-[hash].js',
        path: path.resolve(__dirname, 'dist'),
        library: 'example-prod-lib',
        libraryTarget: 'amd',
        publicPath: 'https://addons.redbull.com/us/example/'
    }

});
