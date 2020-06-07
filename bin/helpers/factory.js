"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignOpts = exports.registerProvidedFactories = exports.getLazyImport = exports.lazyImport = void 0;
function lazyImport(path, opts, def) {
    def = typeof def === 'function' ? def() : def;
    return require(path.join("/")).get(def ? Object.assign(def, opts) : opts);
}
exports.lazyImport = lazyImport;
function getLazyImport(path, def) {
    return (opts) => lazyImport(path, opts, def);
}
exports.getLazyImport = getLazyImport;
function registerProvidedFactories(api) {
    const getPath = getLazyImport([__dirname, 'types/path'], () => ({
        pathLib: api.pathLib,
        fsLib: api.fsLib
    }));
    function registerOption(name, shorcut, factory) {
        if (factory && api.constructor.prototype[shorcut] === undefined)
            api.registerFactory(name, factory);
        api.constructor.prototype[shorcut] = ((flags, opts) => {
            //@ts-ignore
            return api._addOptionType(flags, opts, 'helpType');
        });
    }
    //meta
    api.registerFactory('unknownType', getLazyImport([__dirname, 'types/unknown']));
    api.registerFactory('_context', getLazyImport([__dirname, 'context']));
    api.registerFactory('helpBuffer', getLazyImport([__dirname, 'buffer']));
    // common types
    ['boolean', 'string', 'number', 'enum', 'array'].forEach(name => {
        registerOption(name, name, getLazyImport([__dirname, `types/${name}`]));
    });
    registerOption('stringArray', 'array:string');
    registerOption('numberArray', 'array:number');
    registerOption('path', 'path', getPath);
    registerOption('file', 'file', (opts) => getPath(Object.assign({ dirAllowed: false }, opts)));
    registerOption('dir', 'dir', (opts) => getPath(Object.assign({ fileAllowed: false }, opts)));
    // specialty types
    registerOption('helpType', 'help', getLazyImport([__dirname, "types/help"]));
    registerOption('versionType', 'version', getLazyImport([__dirname, "types/version"]));
    // advanced types
    api.registerFactory('positional', getLazyImport([__dirname, "types/positional"]));
    api.registerFactory('commandType', getLazyImport([__dirname], "types/command"));
}
exports.registerProvidedFactories = registerProvidedFactories;
function assignOpts(target, source, keys) {
    keys.forEach(opt => {
        if (opt in source)
            target[opt] = source[opt];
    });
    return target;
}
exports.assignOpts = assignOpts;
