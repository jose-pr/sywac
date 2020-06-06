
export declare type IFactory<Conf extends {}, T> = (opts: Conf) => T

export function lazyImport<O extends {}, T>(path: string[], opts: Partial<O>, def?: Partial<O> | (() => Partial<O>)) {
    def = typeof def === 'function' ? def() : def;
    return require(path.join("/")).get(def ? Object.assign(def, opts) : opts) as T
}
export function getLazyImport<O extends {}, T>(path: string[], def?: Partial<O> | (() => Partial<O>)) {
    return (opts: Partial<O>) => lazyImport<O, T>(path, opts, def)
}

export function registerProvidedFactories(api: import('../api').Api) {
    const getPath = getLazyImport([__dirname, 'types/path'], () => ({
        pathLib: api.pathLib,
        fsLib: api.fsLib
    })) as any;

    //meta
    api.registerFactory('unknownType', getLazyImport([__dirname, 'types/unknown']));
    api.registerFactory('_context', getLazyImport([__dirname, 'context']));
    api.registerFactory('helpBuffer', getLazyImport([__dirname, 'buffer']));
    // common types
    ['boolean', 'string', 'number', 'enum', 'array'].forEach(name => {
        api.registerOption(name, name, getLazyImport([__dirname, `types/${name}`]))
    })
    api.registerOption('stringArray', 'array:string')
    api.registerOption('numberArray', 'array:number')

    api.registerOption('path', 'path', getPath);
    api.registerOption('file', 'file', (opts) => getPath(Object.assign({ dirAllowed: false }, opts)))
    api.registerOption('dir', 'dir', (opts) => getPath(Object.assign({ fileAllowed: false }, opts)))

    // specialty types
    api.registerOption('helpType', 'help', getLazyImport([__dirname, "types/help"]));
    api.registerOption('versionType', 'version', getLazyImport([__dirname, "types/version"]))

    // advanced types
    api.registerFactory('positional', getLazyImport([__dirname, "types/positional"]))
    api.registerFactory('commandType', getLazyImport([__dirname], "types/command"))
}

export function assignOpts<O extends {}>(target: Partial<O>, source: Partial<O>, keys:(keyof O)[]) {
   keys.forEach(opt => {
        if (opt in source) target[opt] = source[opt]
    })
    return target
}