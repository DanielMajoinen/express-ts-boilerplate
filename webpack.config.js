const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.NODE_ENV !== 'production';

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/src/index.html'),
  filename: 'index.html',
  inject: 'body',
});

const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
});

module.exports = {
  mode: dev ? 'development' : 'production',
  entry: ['@babel/polyfill', path.join(__dirname, '/src/index')],
  devServer: {
    host: 'localhost',
    port: '3000',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      },
      {
        test: /\.scss$/,
        use: ['style-loader','css-loader','sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: dev
    ? [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
    : [HTMLWebpackPluginConfig, DefinePluginConfig],
};