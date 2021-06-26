const common = Object.assign({}, require('./webpack.common'));

const sveltePreprocess = require('svelte-preprocess');
const svelteAssetsPreprocess = require('svelte-assets-preprocessor');

const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const CSSExtractPlugin = require('mini-css-extract-plugin');
const ObfuscatorPlugin = require('webpack-obfuscator');
const ParallelPlugin = require('webpack-parallel-uglify-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const terserSettings = require('./terser.config')
const uglifySettings = require('./uglify.config')
const obfuscatorSettings = require('./obfuscator.config')


common.entry = {
    background: path.resolve('src', 'background.js'),
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