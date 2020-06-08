export interface TypePositional {
    /**
     * Used to configure each positional arg in dsl string, see positional method
     */
    params?: {}[]
    /**Shortcut to add description for positional args without defining params*/
    paramsDescription?: string | string[]
    /**@see {@link paramsDescription} */
    paramsDesc?: string | string[]
    /**@internal */
    paramsDsl: string
    /** The help text group header for positional args, 
     * @default `Arguments:`
     */
    paramsGroup: string,
}