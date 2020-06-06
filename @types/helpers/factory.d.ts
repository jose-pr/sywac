export declare type IFactory<Conf extends {}, T> = (opts: Conf) => T;
export declare function lazyImport<O extends {}, T>(path: string[], opts: Partial<O>, def?: Partial<O> | (() => Partial<O>)): T;
export declare function getLazyImport<O extends {}, T>(path: string[], def?: Partial<O> | (() => Partial<O>)): (opts: Partial<O>) => T;
export declare function registerProvidedFactories(api: import('../api').Api): void;
export declare function assignOpts<O extends {}>(target: Partial<O>, source: Partial<O>, keys: (keyof O)[]): Partial<O>;
