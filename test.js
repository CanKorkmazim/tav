

(async () => {
    const webpack =  require('webpack');
    process.env.NODE_ENV = 'production';
    const c = require('./webpack.config');
    webpack(c).run((a,b)=>{
        console.log(b)
    });
    return;
    const uglifyJS = require('uglify-js');
    const fs = require('fs');
    const terser = require('terser');
    const uglifyOptions = {
        annotations: true,
        sourceMap: false,
        warnings: false,
        webkit: false,
        toplevel: false,
        ie8: false,
        parse: {
            bare_returns: false,
            html5_comments: false,
            shebang: true,
        },
        compress: {
            annotations: true,
            arguments: true,
            arrows: true,
            assignments: true,
            awaits: true,
            booleans: true,
            collapse_vars: true,
            comparisons: true,
            conditionals: true,
            dead_code: true,
            default_values: true,
            directives: true,
            drop_console: false,
            drop_debugger: true,
            evaluate: true,
            expression: false,
            functions: true,
            global_defs: {},
            hoist_exports: true,
            hoist_funs: false,
            hoist_props: true,
            hoist_vars: false,
            if_return: true,
            imports: true,
            inline: true,
            join_vars: true,
            keep_fargs: true,
            loops: true,
            negate_iife: true,
            objects: true,
            passes: 1,
            properties: true,
            pure_funcs: null,
            pure_getters: "strict",
            reduce_funcs: true,
            reduce_vars: true,
            rests: true,
            sequences: true,
            side_effects: true,
            spreads: true,
            strings: true,
            switches: true,
            templates: true,
            top_retain: null,
            toplevel: false,
            typeofs: true,
            unsafe: false,
            unsafe_comps: false,
            unsafe_Function: false,
            unsafe_math: false,
            unsafe_proto: false,
            unsafe_regexp: false,
            unused: true,
            varify: true,
            yields: true,

            // computed_props   : true,
            // ecma             : 5,
            // ie8              : false,
            // keep_classnames  : false,
            // keep_fnames      : false,
            // keep_infinity    : false,
            // unsafe_arrows    : false,
            // unsafe_methods   : false,
            // unsafe_undefined : false,
            // warnings         : false
        },
        mangle: {
            eval: false,
            // ie8              : false,
            // keep_classnames  : false,
            // keep_fnames      : false,
            // properties       : false,
            reserved: [],
            // safari10         : false,
            toplevel: false
        },
        output: {
            annotations: false,
            ascii_only: false,
            beautify: false,
            braces: false,
            comments: false,
            galio: false,
            indent_level: 4,
            indent_start: 0,
            inline_script: true,
            keep_quoted_props: false,
            max_line_len: false,
            preamble: null,
            preserve_line: false,
            quote_keys: false,
            quote_style: 0,
            semicolons: true,
            shebang: true,
            width: 80,
            wrap_iife: false
            // bracketize       : false,
            // ecma             : 5,
            // ie8              : false,
            // safari10         : false,
            // source_map       : null,
            // webkit           : false,
        }
    }
    const terserOptions = {
        module: true,
        sourceMap: false,
        toplevel: true,
        ie8: true,
        keep_classnames: false,
        keep_fnames: false,
        safari10: true,
        compress: {
            arrows: true,
            arguments: true,
            booleans: true,
            booleans_as_integers: false,
            collapse_vars: true,
            comparisons: true,
            computed_props: true,
            conditionals: true,
            dead_code: true,
            directives: true,
            drop_console: false,
            drop_debugger: true,
            ecma: 5,
            evaluate: true,
            expression: true,
            hoist_funs: true,
            hoist_props: true,
            hoist_vars: true,
            if_return: true,
            inline: true,
            join_vars: true,
            keep_classnames: false,
            keep_fargs: false,
            keep_fnames: false,
            keep_infinity: false,
            loops: true,
            negate_iife: true,
            passes: 5,
            properties: true,
            pure_funcs: null,
            pure_getters: true,
            reduce_vars: true,
            reduce_funcs: true,
            sequences: true,
            side_effects: true,
            switches: true,
            typeofs: true,
            unsafe: true,
            unsafe_arrows: true,
            unsafe_comps: true,
            unsafe_Function: false,
            unsafe_math: true,
            unsafe_symbols: true,
            unsafe_methods: true,
            //unsafe_proto: true,
            unsafe_regexp: true,
            unsafe_undefined: true,
            unused: true
        },
        mangle: {
            eval: true,
            keep_classnames: false,
            keep_fnames: false,
            module: true,
            safari10: true
        },
        format: {

            ascii_only: false,
            comments: false,
            braces: false,
            ecma: 5,
            indent_level: 4,
            indent_start: 0,
            inline_script: true,
            keep_numbers: false,
            keep_quoted_props: false,
            max_line_len: false,
            preamble: null,
            quote_keys: false,
            quote_style: 0,
            preserve_annotations: false,
            safari10: true,
            semicolons: true,
            shebang: true,
            spidermonkey: false,
            webkit: false,
            wrap_iife: false,
            wrap_func_args: false
        },
        parse: {
            bare_returns: false,
            html5_comments: false,
            shebang: false,
            spidermonkey: false,
        },
        rename: {},
    }
    const minify = await terser.minify(fs.readFileSync('./output/background.js').toString(), terserOptions)
    fs.writeFileSync('./output/background.js',minify.code)

    return;
    const shrinkString = require('shrink-string')
    const lzma = require('lzma')
    const jsCompress = require('js-string-compression')
    const jsCompressHauffman = new jsCompress.Hauffman();

    const array = [
        '731789204242477056',
        "1310571725663481866",
        "622748940",
        "1025306719860273153",
        "1646021623",
        "16094144",
        "862781527",
    ];

    for(let i = 0;i < 1000;i++){
        console.log(i)
        array.push(String(i))
    }

    const jsonString = JSON.stringify(array);
    const charString = String.fromCharCode.apply(null, array);

    console.log('jsonString',jsonString)
    console.log('charString',charString)

    const shringCompress = await shrinkString.compress(jsonString);
    const shringDeCompress = await shrinkString.decompress(shringCompress);

    console.log('shringCompress',shringCompress)
    console.log('shringDeCompress',shringDeCompress)
    console.log('shrinkCompressEqual', jsonString === shringDeCompress)

    const lzmaCompress = await lzma.compress(jsonString);
    const lzmaDeCompress = await lzma.decompress(lzmaCompress);

    console.log('lzmaCompress',JSON.stringify(lzmaCompress))
    console.log('lzmaDeCompress',lzmaDeCompress)
    console.log('lzmaCompressEqual', jsonString === lzmaDeCompress)

    const jsCompressHauffmanCompress = await jsCompressHauffman.compress(jsonString);
    const jsCompressHauffmanDeCompress = await jsCompressHauffman.decompress(jsCompressHauffmanCompress);

    console.log('jsCompressHauffmanCompress',jsCompressHauffmanCompress)
    console.log('jsCompressHauffmanDeCompress',jsCompressHauffmanDeCompress)
    console.log('jsCompressHauffmanCompressEqual', jsonString === lzmaDeCompress)


    console.log({
        jsonString: jsonString.length,
        charString: charString.length,
        shringCompress:shringCompress.length,
        lzmaCompress:lzmaCompress.length,
        lzmaDeCompress:lzmaDeCompress.length,
        jsCompressHauffmanCompress:jsCompressHauffmanCompress.length
    })

})()