import Api, { } from '../_api';
import { TypeOptions, Factory, Type } from '../api';
import { Sywac } from '../api';

export function lazyImport<O extends {}, T>(path: string[], opts: Partial<O>, def?: Partial<O> | (() => Partial<O>)) {
    def = typeof def === 'function' ? def() : def;
    return require(path.join("/")).get(def ? Object.assign(def, opts) : opts) as T
}
export function getLazyImport<O extends {}, T>(path: string[], def?: Partial<O> | (() => Partial<O>)) {
    return (opts: Partial<O>) => lazyImport<O, T>(path, opts, def)
}

export function registerProvidedFactories(api: Api<any>) {
    const getPath = getLazyImport([__dirname, 'types/path'], () => ({
        pathLib: api.pathLib,
        fsLib: api.fsLib
    })) as any;

    function registerOption<N extends string, O extends TypeOptions<V>, V>(name: string, shorcut: N, factory?: Factory<O, Type<V>, Sywac>) {
        if (factory && api.constructor.prototype[shorcut] === undefined) api.registerFactory(name, factory);
        api.constructor.prototype[shorcut] = ((flags: string | O, opts?: O) => {
            //@ts-ignore
            return api._addOptionType(flags, opts, 'helpType')
        })
    }
    //meta
    api.registerFactory('unknownType', getLazyImport([__dirname, 'types/unknown']));
    api.registerFactory('_context', getLazyImport([__dirname, 'context']));
    api.registerFactory('helpBuffer', getLazyImport([__dirname, 'buffer']));
    // common types
    ['boolean', 'string', 'number', 'enum', 'array'].forEach(name => {
        registerOption(name, name, getLazyImport([__dirname, `types/${name}`]))
    })
    registerOption('stringArray', 'array:string')
    registerOption('numberArray', 'array:number')

    registerOption('path', 'path', getPath);
    registerOption('file', 'file', (opts) => getPath(Object.assign({ dirAllowed: false }, opts)))
    registerOption('dir', 'dir', (opts) => getPath(Object.assign({ fileAllowed: false }, opts)))

    // specialty types
    registerOption('helpType', 'help', getLazyImport([__dirname, "types/help"]));
    registerOption('versionType', 'version', getLazyImport([__dirname, "types/version"]))

    // advanced types
    api.registerFactory('positional', getLazyImport([__dirname, "types/positional"]))
    api.registerFactory('commandType', getLazyImport([__dirname], "types/command"))
}

export function assignOpts<O extends {}>(target: Partial<O>, source: Partial<O>, keys: (keyof O)[]) {
    keys.forEach(opt => {
        if (opt in source) target[opt] = source[opt]
    })
    return target
}