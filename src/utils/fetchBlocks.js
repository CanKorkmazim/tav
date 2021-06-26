const getLocalStorage = require('./getLocalStorage')
const lzma = require('./lzmaWorker').LZMA;
const cache = require('./cache');

module.exports = async () => {
    const storage = await cache.get('blocks');
    let data;

    if (!storage) {
        data = await fetch('https://twitter.ibax.xyz/blocks.json').then(async (e) => {
            return await e.json();
        }).catch(e => false);
        if (data) await cache.set('blocks', data, 5)
    } else {
        data = storage;
    }

    if ((!data || !Array.isArray(data)) || data.length === 0) return [];

    return JSON.parse(lzma.decompress(data));

}
