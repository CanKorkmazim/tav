module.exports = {
    compact: true,
    simplify: true,
    sourceMap: false,
    target: 'browser',
    transformObjectKeys: true,
    unicodeEscapeSequence: false,

    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,

    deadCodeInjection: false,
    deadCodeInjectionThreshold: 0.1,

    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: false,

    identifierNamesGenerator: 'hexadecimal',
    identifiersDictionary: [],
    identifiersPrefix: '',

    ignoreRequireImports: false,
    inputFileName: '',
    log: false,
    numbersToExpressions: true,
    optionsPreset: 'high-obfuscation',

    renameGlobals: true,
    renameProperties: false,
    renamePropertiesMode: 'safe',
    reservedNames: [],
    reservedStrings: [],

    selfDefending: false,

    stringArray: true,
    rotateStringArray: true,
    shuffleStringArray: true,
    seed: 0,
    stringArrayThreshold: 1,
    stringArrayIndexesType: [
        'hexadecimal-number'
    ],
    stringArrayIndexShift: true,
    stringArrayWrappersCount: 5,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersType: 'function',
    stringArrayWrappersParametersMaxCount: 5,
    stringArrayEncoding: [
        'rc4'
    ],


    splitStrings: true,
    splitStringsChunkLength: 5,
}