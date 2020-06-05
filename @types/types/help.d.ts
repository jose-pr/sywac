import TypeImplicitCommand from "./implicit";
import { TypeOptions } from "./type";
import { Context } from "../context";
interface HelpBufferOptions {
    includePreface?: boolean;
    includeUsage?: boolean;
    includeGroups?: boolean;
    includeExamples?: boolean;
    includeEpilogue?: boolean;
}
export interface TypeHelpOptions extends HelpBufferOptions, TypeOptions<boolean> {
}
declare class TypeHelp extends TypeImplicitCommand {
    static get(opts?: TypeHelpOptions): TypeHelp;
    private _bufferOpts?;
    constructor(opts?: TypeHelpOptions);
    configure(opts?: TypeHelpOptions, override?: boolean): this;
    _assignBufferOpts(target: HelpBufferOptions, source: TypeHelpOptions): HelpBufferOptions;
    get bufferOpts(): HelpBufferOptions;
    validateConfig(utils: any): void;
    validateParsed(context: Context): Promise<this>;
    implicitCommandFound(context: Context, source: string, position: number, raw: string): void;
    requestHelp(context: Context): void;
}
export default TypeHelp;
