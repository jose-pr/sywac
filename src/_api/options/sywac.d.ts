
export declare interface SywacOptions {
    /**
     * Override functions defined in a utility class.
     * default is an instance of require('sywac/lib/utils')
     * @default require('sywac/lib/utils')
     */
    utils?: unknown
    pathLib?: typeof import('path')
    fsLib?: typeof import('fs')
    /**
     * Register factory methods for custom types. Each property should be the name of the factory and the factory function.
     * @see {@link Api.registerFactory}
     */
    factories?: Record<string, IFactory<TypeOptions<any>, IType<TypeOptions<any>, any>>>
    /**
     * Explicitly define the name of the program to use in help text. This value will be used in place of $0 in usage content or examples.
     * default is basename of process.argv[1]
     * @default process.argv[1]
     */
    name?: string
    /**@internal */
    parentName?: string
    helpOpts?: {}
    showHelpByDefault?: boolean
    strictMode?: boolean
    /**@internal */
    modulesSeen?: []
}