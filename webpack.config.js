module.exports = {
    entry : './src/main.js',
    output : {
        path : './',
        filename : 'index.js'
    },
    devServer : {
        inline : true,
        port : 3333
    },
    module : {
        preLoaders: [
              {
                test: /\.js$/,
                loader: "eslint-loader",
                exclude: /node_modules/,
              }
        ]
    },
    eslint: {
        configFile: './.eslintrc'
    }
}