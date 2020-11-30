const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const history = require('./mock/history.json');

module.exports = {
  entry: './src/practice/ts/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    before: function (app, server, compiler) {
      app.get('/history', function (req, res) {
        res.json(history);
      });
    }
  },
  plugins: [new HtmlWebpackPlugin({
    template: "./src/practice/html/index.html"
  })],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};