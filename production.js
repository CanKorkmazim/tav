console.log('Production build after script run.');


const fs = require('fs');
const path = require('path');
const getFiles = require('./src/utils/getFiles');
const terser = require('terser');
const obfuscator = require('javascript-obfuscator')
const terserSettings = require('./terser.config');
const obfuscatorSettings = require('./obfuscator.config');

(async () => {
    const files = await getFiles(path.resolve('output'));

    for (let file of files) {
        if (file.endsWith('.js')) {
            const content = fs.readFileSync(file).toString();
            const minify = await terser.minify(content, terserSettings)

            console.log(file, {
                original: content.length,
                minify: minify.code.length,
            })
            fs.writeFileSync(file, minify.code)
        }
    }
})()