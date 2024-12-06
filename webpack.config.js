const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV

module.exports = {
  mode,
  entry: {
    app: './js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    ...mode === 'production' ? [
      new CopyPlugin({
        patterns: [
          { from: 'img', to: 'img' },
          { from: 'css', to: 'css' },
          { from: 'js/vendor', to: 'js/vendor' },
        ],
      })
    ] : [],
  ],
  ...mode === 'development' && {
    devtool: 'inline-source-map',
    devServer: {
      liveReload: true,
      hot: true,
      open: true,
      static: ['./'],
    }
  },
};
