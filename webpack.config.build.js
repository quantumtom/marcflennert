const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {

    mode: 'production',
    output: {
        filename: '[name]-[hash].js',
        library: 'marcflennert-prod-lib',
        libraryTarget: 'amd',
        path: path.resolve(__dirname, 'dist'),
        pathinfo: true,
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.SplitChunksPlugin({
            filename: 'main.js',
            name: 'marcflennert',
            automaticNameDelimiter: '-',
            chunks: 'all',
            minChunks: 2,
            runtimeChunk: true
        }),
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
    ],
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
});
