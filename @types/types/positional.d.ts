import TypeWrapper, { TypeWrapperOptions } from './wrapper';
import { Context } from '../context';
export interface TypePositionalOptions<T> extends TypeWrapperOptions<T> {
    acceptFlags?: boolean;
    variadic?: boolean;
    params?: any;
}
export declare class TypePositional<T> extends TypeWrapper<T> {
    static get<T>(opts?: TypePositionalOptions<T>): TypePositional<T>;
    acceptFlags?: boolean;
    _variadic?: boolean;
    constructor(opts?: TypePositionalOptions<T>);
    configure(opts?: TypePositionalOptions<T>, override?: boolean): this;
    get isVariadic(): boolean | undefined;
    get helpGroup(): string;
    buildHelpHints(hints: string[]): void;
    withParent(apiName: string): this;
    validateConfig(utils: any): void;
    parse(context: Context): Promise<this>;
    validateParsed(context: Context): Promise<this>;
    setValue(context: Context, value: T): void;
    applySource(context: Context, source: string, position: number, raw: string): void;
    toResult(context: Context, shouldCoerce: boolean): Partial<import("../context").TypeObject>;
}
export default TypePositional;
