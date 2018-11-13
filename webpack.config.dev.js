const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

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
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './views/pages/index.ejs'),
            title: 'Marc Flennert'
        })
    ]

});
