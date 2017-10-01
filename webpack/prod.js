var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + '/dist',
        filename: "../../dist/prod/js/bundle.js"
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: '../../dist/prod/index.html',
        template: './src/views/prod.html',
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
          },{
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
              'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
              'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
      }]
    }
};
