const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = merge(webpackConfig, {
    mode: 'development',
    entry: {
        app: './public/js/main.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
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
            template: path.join(__dirname, 'views/pages/index.ejs'),
            title: 'Professional Work - By Marc Flennert'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }
});
