const common = Object.assign({},require('./webpack.common'));
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

common.entry = {
    bootstrap: path.resolve('bootstrap.js'),
}
common.target = 'node';

common.output = {
    publicPath: '',
    path: path.resolve('output'),
    filename: '[name].js'
}

common.module = {
    rules: [
        {
            test: /\.json$/,
            type: 'javascript/auto',
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name(resourcePath, resourceQuery) {
                            if (resourcePath === path.resolve('src', 'manifest.json')) return 'manifest.json';

                            return '[contenthash].[ext]';
                        },
                    },
                },
            ],
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name(resourcePath, resourceQuery) {
                            if (resourcePath.includes(path.resolve('src', 'images', 'manifest'))) return 'images/manifest/[name].[ext]';

                            return '[contenthash].[ext]';
                        },
                    },
                },
            ],
        },
    ],
}
module.exports = common