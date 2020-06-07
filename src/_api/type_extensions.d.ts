import { ArgvExtension, TypeOptions } from "./index"
declare module "./sywac" {
     interface SywacExtensions<A> {
        /**
         *  Add a boolean option
         * @param flags 
         * @param opts 
         */
        boolean<N extends string, O extends TypeOptions<boolean>>(flags: N | N[], opts?: O): Sywac<A & ArgvExtension<O & { aliases: N }, boolean>>
        /**
         * Add a boolean option
         * @param opts 
         */
        boolean<O extends TypeOptions<boolean>>(opts: O): Sywac<A & ArgvExtension<O, boolean>>
    }
}