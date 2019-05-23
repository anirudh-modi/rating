module.exports = {
    entry: {
        index: './client/index.js'
    },
    output: {
        path: __dirname + '/dist/bundles',
        filename: '[name]-bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
}