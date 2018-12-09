const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const PreloadWebpackPlugin = require('preload-webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'dev';

console.log('process.env.NODE_ENV is ' + process.env.NODE_ENV);

const config = {
  mode: IS_DEV ? 'development' : 'production',
  devtool: IS_DEV ? 'eval' : 'source-map',
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'ejs-webpack-loader',
            options: {
              htmlmin: true,
              emitFile: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'public/[name].[ext]?[hash:7]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              mozjpeg: {
                progressive: true,
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: [':data-src'],
              minimize: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery'
    }),
    new CopyWebpackPlugin([
      {
        from: './public',
        to: 'public'
      }
    ]),
    new HtmlWebPackPlugin({
      hash: true,
      template: path.join(__dirname, 'src/work.ejs'),
      title: 'Professional Work - By Marc Flennert',
      filename: 'index.html',
      favicon: './public/icon.ico',
      minify: !IS_DEV && {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        removeComments: true
      }
    }),
    new HtmlWebPackPlugin({
      hash: true,
      template: path.join(__dirname, 'src/about.ejs'),
      title: 'About Marc Flennert',
      filename: 'about.html',
      favicon: './public/icon.ico',
      minify: !IS_DEV && {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: IS_DEV ? 'css/[name].css' : 'css/[name].[contenthash].css',
      chunkFilename: IS_DEV ? 'css/[id].css' : 'css/[id].[hash].css'
    }),
    // new PreloadWebpackPlugin({
    //   include: 'initial'
    // }),
    new webpack.HashedModuleIdsPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    compress: true,
    port: 8080,
    open: true,
    host: 'localhost',
    index: './src/index.ejs',
    inline: true,
    hot: true
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    },
    minimizer: []
  }
};

if (!IS_DEV) {
  const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
  const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

  config.optimization.minimizer.push(
    new UglifyJsPlugin({
      sourceMap: false
    }),
    new OptimizeCSSAssetsPlugin({})
  );
}

module.exports = config;
