import Type, { TypeOptions } from "./type";
import { Context, SlurpedArg } from "../context";
declare class TypeBoolean extends Type<boolean> {
    static get(opts: TypeOptions<boolean>): TypeBoolean;
    constructor(opts: TypeOptions<boolean>);
    get datatype(): string;
    isApplicable(context: Context, currentValue: unknown, previousValue: unknown, slurpedArg: SlurpedArg): boolean;
    setValue(context: Context, value: boolean): void;
}
export default TypeBoolean;
