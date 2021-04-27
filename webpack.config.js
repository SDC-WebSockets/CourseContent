const path = require('path');
import html from './file.html';
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: `bundle-${Date.now()}.js`,
    path: DIST_DIR
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|html|mp3)$/,
        loader: 'file-loader'
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      }
    ]
  }
};