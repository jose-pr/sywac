import { TypeOptions } from "./type"
import { Sywac, SywacHandler } from "../sywac"
import { TypePositional } from "./positional"
export interface TypeCommandOptions<A> extends TypeOptions<boolean>, TypePositional {
    api?: Sywac<A>
    /**
     * Words to ignore in the dsl string
     */
    ignore?: string | string[]
    /**
     * Defines the setup handler
     */
    setup?: (api: Sywac) => void
    /**
     * Defines the run handler
     */
    run?: SywacHandler
    paramsDsl?: string
}