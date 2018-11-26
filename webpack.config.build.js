const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackConfig = require('./webpack.config');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(webpackConfig, {

    mode: 'production',

    devtool: 'cheap-module-source-map',

    output: {
        filename: '[name].js',
        library: 'marcflennert-lib',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
        pathinfo: true,
        publicPath: '/'
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
            template: path.join(__dirname, 'views/pages/work.ejs'),
            title: 'Professional Work - By Marc Flennert',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]

});
