const path = require('path');

module.exports = [{
  devtool: 'source-map',
  entry: {
    'ramda-polyfill': './index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: 'ramda-polyfill',
    libraryTarget: 'umd'
  },
  resolve: {
    modules: ['.', 'node_modules']
  },
  target: 'node',
  externals: {
    ramda: 'ramda'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.resolve(__dirname, '../index.js'),
      query: {
        presets: ['es2015']
      }
    }]
  }
}];
