import Api from '../api';
export declare function lazyImport<O extends {}, T>(path: string[], opts: Partial<O>, def?: Partial<O> | (() => Partial<O>)): T;
export declare function getLazyImport<O extends {}, T>(path: string[], def?: Partial<O> | (() => Partial<O>)): (opts: Partial<O>) => T;
export declare function registerProvidedFactories(api: Api<any>): void;
export declare function assignOpts<O extends {}>(target: Partial<O>, source: Partial<O>, keys: (keyof O)[]): Partial<O>;
