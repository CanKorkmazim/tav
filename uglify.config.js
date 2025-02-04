module.exports = {
    parse: {
        bare_returns     : false,
        ecma             : 8,
        expression       : false,
        filename         : null,
        html5_comments   : true,
        shebang          : true,
        strict           : false,
        toplevel         : null
    },
    compress: {
        arrows           : true,
        booleans         : true,
        collapse_vars    : true,
        comparisons      : true,
        computed_props   : true,
        conditionals     : true,
        dead_code        : true,
        drop_console     : false,
        drop_debugger    : true,
        ecma             : 5,
        evaluate         : true,
        expression       : false,
        global_defs      : {},
        hoist_funs       : false,
        hoist_props      : true,
        hoist_vars       : false,
        ie8              : false,
        if_return        : true,
        inline           : true,
        join_vars        : true,
        keep_classnames  : false,
        keep_fargs       : true,
        keep_fnames      : false,
        keep_infinity    : false,
        loops            : true,
        negate_iife      : true,
        passes           : 1,
        properties       : true,
        pure_getters     : "strict",
        pure_funcs       : null,
        reduce_funcs     : true,
        reduce_vars      : true,
        sequences        : true,
        side_effects     : true,
        switches         : true,
        top_retain       : null,
        toplevel         : false,
        typeofs          : true,
        unsafe           : false,
        unsafe_arrows    : false,
        unsafe_comps     : false,
        unsafe_Function  : false,
        unsafe_math      : false,
        unsafe_methods   : false,
        unsafe_proto     : false,
        unsafe_regexp    : false,
        unsafe_undefined : false,
        unused           : true,
        warnings         : false
    },
    mangle: {
        eval             : false,
        ie8              : false,
        keep_classnames  : false,
        keep_fnames      : false,
        properties       : false,
        reserved         : [],
        safari10         : false,
        toplevel         : false
    },
    output: {
        ascii_only       : false,
        beautify         : false,
        bracketize       : false,
        comments         : /@license|@preserve|^!/,
        ecma             : 5,
        ie8              : false,
        indent_level     : 4,
        indent_start     : 0,
        inline_script    : true,
        keep_quoted_props: false,
        max_line_len     : false,
        preamble         : null,
        preserve_line    : false,
        quote_keys       : false,
        quote_style      : 0,
        safari10         : false,
        semicolons       : true,
        shebang          : true,
        source_map       : null,
        webkit           : false,
        width            : 80,
        wrap_iife        : false
    },
    wrap: false
}