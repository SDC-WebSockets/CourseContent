const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'course-content.js',
    path: DIST_DIR,
    clean: true
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
        exclude: [/node_modules/, /test/],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: [/node_modules/, /test/],
        use: ['babel-loader', 'source-map-loader']
      },
      {
        test: /\.css$/i,
        exclude: [/node_modules/, /test/],
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
      inject: 'body'
    })
  ]
};