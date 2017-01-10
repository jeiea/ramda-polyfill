const path = require('path');
const webpack = require('webpack');

module.exports = [{
  devtool: 'source-map',
  entry: {
    'ramda-polyfill': './index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].min.js',
  },
  resolve: {
    modules: ['.', 'node_modules']
  },
  module: {
    loaders: [{
      enforce: 'pre',
      test: /\.js$/,
      loader: 'eslint-loader',
      include: path.resolve(__dirname, '../index.js'),
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.resolve(__dirname, '../index.js'),
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      cacheFolder: path.resolve(__dirname, '../build/'),
      debug: true,
      minimize: true,
      sourceMap: true,
      output: {
        comments: false
      },
      compressor: {
        warnings: false
      }
    }),
  ]
}];
