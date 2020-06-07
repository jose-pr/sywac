export declare interface Factory<O extends {}, T, THIS = never> {
    (this:THIS, opts: O): T
}
export declare interface FactoryProvider<O extends {}, T, THIS = unknown> {
    get: Factory<O, T, THIS>
}
