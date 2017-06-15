module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "../dist/js/bundle.js"
    },
    watch: true,
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
        }]
    }
};
