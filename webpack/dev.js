var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + '/dist',
    filename: "../../dist/dev/js/bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../../dist/dev/index.html',
      template: './src/views/dev.html',
      inject: false
    })
  ],
  watch: false,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
          loader: "babel-loader"
      }]
    }]
  }
};
