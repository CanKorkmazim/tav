const fs = require('fs')
const path = require('path')
const lzma = require('./utils/lzmaWorker').LZMA;
const requireReload = require('require-reload');

setInterval(function () {
    const fetch = requireReload('./blocks');
    const blocks = JSON.stringify(fetch);
    const compressed = lzma.compress(blocks);
    const compressedString = JSON.stringify(compressed);


    fs.writeFileSync(path.resolve('blocks.json'),compressedString);
},2000)
