module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "../dist/js/bundle.js"
    },
    watch: false,
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader"
            }]
          }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
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
