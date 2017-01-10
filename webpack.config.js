const path = require('path');
const webpack = require('webpack');

module.exports = [{
  devtool: 'source-map',
  entry: {
    'ramda-polyfill': './index.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: 'ramda-polyfill',
    libraryTarget: 'commonjs-module'
  },
  resolve: {
    modules: ['.', 'node_modules']
  },
  externals: {
    'ramda': 'ramda'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.resolve(__dirname, './index.js'),
      query: {
        presets: ['es2015']
      }
    }]
  }
}];
