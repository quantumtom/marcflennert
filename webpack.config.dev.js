const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = merge(webpackConfig, {

    mode: 'development',

    devtool: 'cheap-module-source-map',

    output: {
        pathinfo: true,
        publicPath: '/',
        library: 'marcflennert-dev-lib',
        libraryTarget: 'umd',
        filename: '[name].js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            hash: true,
            template: path.join(__dirname, 'views/pages/about.ejs'),
            title: 'About Marc Flennert',
            filename: 'about.html'
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: path.join(__dirname, 'views/pages/reel.ejs'),
            title: 'Professional Work - By Marc Flennert'
        })
    ]

});
