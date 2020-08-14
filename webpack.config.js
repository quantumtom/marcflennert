const path = require('path');
const { join } = require('path');
const webpack = require('webpack');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const outputPath = join(process.cwd(), '/dist');

const IS_DEV = process.env.NODE_ENV === 'dev';

let mode = IS_DEV ? 'development' : 'production';

console.log('Running Webpack in "' + mode + '" mode.');

const config = {
  mode: mode,
  devtool: IS_DEV ? 'eval' : 'source-map',
  watch: true,
  entry: ['./src/js/index.js', 'webpack-plugin-serve/client'],
  output: {
    filename: 'js/[name].[hash].js',
    path: outputPath
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
        test: /\.(gif|png|jpe?g|svg|woff|woff2|ttf)$/i,
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
      }
    ]
  },
  plugins: [
    new Serve({ static: outputPath }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery'
    }),
    new HtmlWebPackPlugin({
      hash: true,
      template: path.join(__dirname, 'src/work.ejs'),
      title: 'Commercials by Marc Flennert',
      filename: 'index.html',
      favicon: './public/favicon/favicon.ico',
      minify: !IS_DEV && {
        collapseWhitespace: true,
        preserveLineBreaks: false,
        removeComments: true
      },
      meta: {
        description: 'Commercials by Marc Flennert',
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      }
    }),
    new HtmlWebPackPlugin({
      hash: true,
      template: path.join(__dirname, 'src/shorts.ejs'),
      title: 'Shorts by Marc Flennert',
      filename: 'shorts.html',
      favicon: './public/favicon/favicon.ico',
      minify: !IS_DEV && {
        collapseWhitespace: true,
        preserveLineBreaks: false,
        removeComments: true
      },
      meta: {
        description: 'Shorts by Marc Flennert',
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      }
    }),
    new HtmlWebPackPlugin({
      hash: true,
      template: path.join(__dirname, 'src/about.ejs'),
      title: 'About Marc Flennert',
      filename: 'about.html',
      favicon: './public/favicon/favicon.ico',
      minify: !IS_DEV && {
        collapseWhitespace: true,
        preserveLineBreaks: false,
        removeComments: true
      },
      meta: {
        description: 'About Marc Flennert',
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: IS_DEV ? 'css/[name].css' : '[name].[contenthash].css',
      chunkFilename: IS_DEV ? 'css/[id].css' : '[id].[hash].css'
    }),
    new webpack.HashedModuleIdsPlugin()
  ],
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
