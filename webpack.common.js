const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
    mode: mode,
    devtool: prod ? false : 'source-map',
    entry: {},
    target: 'web',
    devServer: {
        hotOnly: !prod,
    },
    stats: {
        warnings: false
    },
    optimization: {
        minimize: prod,

    },
    performance: {
        hints: false
    },
    module: {
        rules: [

        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    output: {
        publicPath: '',
        path: path.resolve('output'),
        filename: '[name].js'
    },
    plugins: [
        new CleanWebpackPlugin({ root: __dirname, verbose: true, dry: true, exclude: []}),
        new NodePolyfillPlugin()
    ]
}