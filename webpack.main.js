const common = Object.assign({}, require('./webpack.common'));
const sveltePreprocess = require('svelte-preprocess');
const svelteAssetsPreprocess = require('svelte-assets-preprocessor');
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const CSSExtractPlugin = require('mini-css-extract-plugin');
const ParallelPlugin = require('webpack-parallel-uglify-plugin');
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';
const terserSettings = require('./terser.config');
const ObfuscatorPlugin = require('webpack-obfuscator');
const obfuscatorSettings = require('./obfuscator.config');
const { HotModuleReplacementPlugin } = require('webpack');
const postCssPresetEnv = require('postcss-preset-env');

common.entry = {
    'app' : path.resolve('src', 'main', 'main.js')
};
common.target = 'web';
common.output = {
    path          : path.resolve('output', 'main'),
    filename      : '[name].js',
    chunkFilename : '[name].[id].js'
};
common.resolve = {
    alias      : {
        svelte : path.dirname(require.resolve('svelte/package.json'))
    },
    extensions : ['.mjs', '.js', '.svelte'],
    mainFields : ['svelte', 'browser', 'module', 'main']
};
common.module = {
    rules : [
        {
            test : /\.svelte$/,
            use  : {
                loader  : 'svelte-loader',
                options : {
                    compilerOptions : {
                        dev : !prod
                    },
                    emitCss         : true,
                    hotReload       : !prod,
                    preprocess      : [
                        sveltePreprocess({
                            sourceMap : !prod,
                            scss      : {
                                renderSync : true
                            }
                        }),
                        svelteAssetsPreprocess()
                    ]

                }
            }
        },
        {
            test : /\.css$/,
            use  : [
                CSSExtractPlugin.loader,
                {
                    loader  : 'css-loader',
                    options : {
                        import    : true,
                        sourceMap : !prod
                    }
                },
                {
                    loader  : 'postcss-loader',
                    options : {
                        postcssOptions : {
                            config : path.resolve('postcss.config.js')
                        }
                    }
                },
                {
                    loader : 'sass-loader'
                }
            ]
        },
        {
            test    : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader  : 'file-loader',
            options : {
                name : prod ? 'assets/images/[hash].[ext]' : '[path][name].[ext]?[hash]'
            }
        },
        {
            test    : /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader  : 'file-loader',
            options : {
                name : prod ? 'assets/media/[hash].[ext]' : '[path][name].[ext]?[hash]'
            }
        },
        {
            test    : /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader  : 'file-loader',
            options : {
                name : prod ? 'assets/fonts/[hash].[ext]' : '[path][name].[ext]?[hash]'
            }
        },
        {
            // required to prevent errors from Svelte on Webpack 5+
            test    : /node_modules\/svelte\/.*\.mjs$/,
            resolve : {
                fullySpecified : false
            }
        }
    ]
};

common.plugins = common.plugins.concat((() => {
    let data = [];
    data.push(new CSSExtractPlugin({
        filename : '[name].css'
    }));
    data.push(new HTMLPlugin({
        template : path.resolve('src', 'main', 'public', 'index.html'),
        favicon  : path.resolve('src', 'main', 'public', 'favicon.png'),
        filename : 'app.html',
        inject   : false,
        minify:prod,
        xhtml:true
    }));

    if (prod) {
        data.push(new ParallelPlugin({
            sourceMap : !prod,
            terser    : terserSettings
        }));
        //data.push(new ObfuscatorPlugin(obfuscatorSettings))

    } else {
        data.push(new HotModuleReplacementPlugin());
    }
    return data;
})());
module.exports = common;