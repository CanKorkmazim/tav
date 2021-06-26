const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';
const plugins = {};


if (prod) {
    plugins['postcss-import'] = {};
    plugins['postcss-preset-env'] = {
        browsers : 'last 2 versions',
        stage    : 0
    };
    plugins['cssnano'] = {};
}
module.exports = {
    plugins : plugins
};