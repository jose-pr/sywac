import Type, { TypeOptions } from "./type";
import { Context } from "../context";
declare class TypeNumber extends Type<number> {
    static isNumber(value: string | number): value is number;
    static get(opts?: TypeOptions<number>): TypeNumber;
    get datatype(): string;
    getValue(context: Context): number;
    setValue(context: Context, value: number): void;
    validateValue(value: string | number): boolean;
    buildInvalidMessage(context: Context, msgAndArgs: {
        msg: string;
        args: (number | string)[];
    }): void;
}
export default TypeNumber;
