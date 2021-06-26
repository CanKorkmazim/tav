const common = Object.assign({},require('./webpack.common'));
const path = require('path');
const ParallelPlugin = require('webpack-parallel-uglify-plugin');
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';
const terserSettings = require('./terser.config')
const ObfuscatorPlugin = require('webpack-obfuscator');
const obfuscatorSettings = require('./obfuscator.config')

common.entry = {
    foreground: path.resolve('src', 'foreground.js'),
}
common.target = 'web';
common.output = {
    publicPath: '',
    path: path.resolve('output'),
    filename: '[name].js'
}

common.plugins = common.plugins.concat((() => {
    let data = [];

    if (prod) {
        data.push(new ParallelPlugin({
            sourceMap: !prod,
            terser: terserSettings
        }))
        //data.push(new ObfuscatorPlugin(obfuscatorSettings))

    }
    return data;
})())
module.exports = common