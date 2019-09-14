const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkgJson = require('./package.json');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/index.ts',
  },
  output: {
    filename: '[hash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: pkgJson.name
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkgJson.version),
      NAME: JSON.stringify(pkgJson.fancyName),
      PRODUCTION: JSON.stringify(!!process.env.production)
    }),
    new MiniCssExtractPlugin({
      filename: '[hash].css',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.html']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(less|css)$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'less-loader' ],
      },
      {
        test: /\.(png|svg|jpg|gif|html)$/,
        use: [ 'file-loader' ]
      }
    ]
  }
};