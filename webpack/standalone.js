const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
    rules: [{
      enforce: 'pre',
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      loader: "eslint-loader",
      options: {
        // eslint options (if necessary)
      }
    }, {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    }],
    // loaders: [{
    //   enforce: 'pre',
    //   test: /\.js$/,
    //   loader: 'eslint-loader',
    //   include: path.resolve(__dirname, '../index.js'),
    // }, {
    //   test: /\.js$/,
    //   loader: 'babel-loader',
    //   include: path.resolve(__dirname, '../index.js'),
    //   query: {
    //     presets: ['es2015']
    //   }
    // }]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        inline: false,
      }
    })]
  },
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     cacheFolder: path.resolve(__dirname, '../build/'),
  //     debug: true,
  //     minimize: true,
  //     sourceMap: true,
  //     output: {
  //       comments: false
  //     },
  //     compressor: {
  //       warnings: false
  //     }
  //   }),
  // ]
}];