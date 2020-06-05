import Type, { TypeOptions } from "./type";
import { Context } from "../context";
export interface TypeStringOptions extends TypeOptions<string> {
}
declare class TypeString extends Type<string> {
    static get(opts?: TypeStringOptions): TypeString;
    get datatype(): string;
    getValue(context: Context): string;
    setValue(context: Context, value: string): void;
    hasRequiredValue(context: Context): boolean;
}
export default TypeString;
