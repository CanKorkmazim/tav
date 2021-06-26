const rimraf = require('rimraf')
const mainConfig = require('./webpack.main')
const foregroundConfig = require('./webpack.foreground');
const backgroundConfig = require('./webpack.background');
const bootstrapConfig = require('./webpack.bootstrap');


const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

if(prod) rimraf.sync("./output");
module.exports = [
    bootstrapConfig,
    foregroundConfig,
    backgroundConfig,
    mainConfig,
]
module.exports.parallelism = 1;