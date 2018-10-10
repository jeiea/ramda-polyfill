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
      loader: "eslint-loader"
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
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        inline: false,
      }
    })]
  },
}];