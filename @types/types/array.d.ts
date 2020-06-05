import TypeWrapper, { TypeWrapperOptions } from "./wrapper";
import { Context, SlurpedArg } from "../context";
export interface TypeArrayOptions<T> extends TypeWrapperOptions<T[]> {
    delimiter?: string;
    delim?: string;
    cumulative?: boolean;
}
export declare class TypeArray<T> extends TypeWrapper<T[]> {
    static get<T>(opts?: TypeArrayOptions<T>): TypeArray<T>;
    private _delim?;
    private _cumulative?;
    constructor(opts?: TypeArrayOptions<T>);
    configure(opts?: TypeArrayOptions<T>, override?: boolean): this;
    delimiter(d: string): this;
    get delim(): string | undefined;
    cumulative(c: boolean): this;
    get defaultVal(): T[];
    get datatype(): string;
    buildHelpHints(hints: string[]): void;
    isApplicable(context: Context, currentValue: unknown, previousValue: unknown, slurpedArg: SlurpedArg): boolean;
    observeAlias(context: Context, alias: string): void;
    setValue(context: Context, value: unknown): void;
    addValue(context: Context, value: unknown): void;
    get isStrict(): boolean;
    validateValue(value: any, context: Context): Promise<boolean>;
    buildInvalidMessage(context: Context, msgAndArgs: any): void;
}
export default TypeArray;
