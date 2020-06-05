import TypeImplicitCommand, { TypeImplicitCommandOptions } from './implicit';
import { Context, DeferVersion } from '../context';
export interface TypeVersionOptions extends DeferVersion, TypeImplicitCommandOptions {
}
declare class TypeVersion extends TypeImplicitCommand {
    static get(opts: TypeVersionOptions): TypeVersion;
    private _versionOpts?;
    constructor(opts?: TypeVersionOptions);
    configure(opts?: TypeVersionOptions, override?: boolean): this;
    _assignVersionOpts(target: TypeVersionOptions, source: TypeVersionOptions): TypeVersionOptions;
    get versionOpts(): TypeVersionOptions;
    validateConfig(utils: any): void;
    validateParsed(context: Context): Promise<this>;
    implicitCommandFound(context: Context, source: string, position: number, raw: string): void;
    requestVersion(context: Context): void;
}
export default TypeVersion;
