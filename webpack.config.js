const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackS3Plugin = require('webpack-s3-plugin');
const config = require('./config.js');
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
        exclude: /node_modules/,
        use: ['babel-loader', 'source-map-loader']
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './client/src/index.html',
    //   inject: 'body'
    // }),
    new WebpackS3Plugin({
      exclude: /.*\.html$/,
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || config.accessKeyID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || config.secretAccessKey,
        region: 'eu-west-2'
      },
      s3UploadOptions: {
        Bucket: 'charlotte-badger-course-content-bundles'
      },
      cdnizerOptions: {
        defaultCDNBase: 'https://charlotte-badger-course-content-bundles.s3.eu-west-2.amazonaws.com'
      }
    })
  ]
};