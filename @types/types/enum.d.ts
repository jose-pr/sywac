import TypeString, { TypeStringOptions } from './string';
import { Context } from '../context';
export interface TypeEnumOptions extends TypeStringOptions {
    /**
     * @default true
     */
    strict?: boolean;
    /**
     * @default true
     */
    caseInsensitive?: boolean;
    choices?: string[];
}
declare class TypeEnum extends TypeString {
    static get(opts?: TypeEnumOptions): TypeEnum;
    private _choices?;
    private _caseInsensitive?;
    constructor(opts?: TypeEnumOptions);
    configure(opts?: TypeEnumOptions, override?: boolean): this;
    get datatype(): string;
    choice(c: string): this;
    get choices(): string[];
    buildHelpHints(hints: string[]): void;
    validateValue(value: unknown): boolean;
    buildInvalidMessage(context: Context, msgAndArgs: any): void;
}
export default TypeEnum;
