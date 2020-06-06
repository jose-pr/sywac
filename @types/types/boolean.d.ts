import Type from "./type";
import { Context, SlurpedArg } from "../context";
import { TypeOptions } from "./api";
declare class TypeBoolean extends Type<boolean> {
    static get(opts: TypeOptions<boolean>): TypeBoolean;
    constructor(opts: TypeOptions<boolean>);
    get datatype(): string;
    isApplicable(context: Context, currentValue: unknown, previousValue: unknown, slurpedArg: SlurpedArg): boolean;
    setValue(context: Context, value: boolean): void;
}
declare module '../api' {
    interface Api {
        /**
         *  Add a boolean option
         * @param flags
         * @param opts
         */
        boolean(flags: string, opts: TypeOptions<boolean>): Api;
    }
}
export default TypeBoolean;
