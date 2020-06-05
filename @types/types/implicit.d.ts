import TypeBoolean from './boolean';
import { TypeOptions } from './type';
import { Context } from '../context';
export interface TypeImplicitCommandOptions extends TypeOptions<boolean> {
    implicitCommand?: boolean;
}
declare class TypeImplicitCommand extends TypeBoolean {
    private _implicitCommand?;
    constructor(opts?: TypeImplicitCommandOptions);
    configure(opts?: TypeImplicitCommandOptions, override?: boolean): this;
    get implicitCommands(): string[];
    buildHelpHints(hints: string[]): void;
    implicitCommandFound(context: Context, source: string, position: number, raw: string): void;
}
export default TypeImplicitCommand;
