const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  devServer: {
    port: 3000,
    watchContentBase: true
  },
  // mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['babel-loader', 'source-map-loader']
      }
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: './client/src/index.html' })]
};