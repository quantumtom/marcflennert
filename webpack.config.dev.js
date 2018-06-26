const path = require('path');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {

    mode: 'development',

    devtool: 'cheap-module-source-map',

    output: {
        pathinfo: true,
        publicPath: '/',
        library: 'example-dev-lib',
        libraryTarget: 'umd',
        filename: '[name].js'
    }

});
