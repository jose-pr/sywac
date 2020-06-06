import Api from '../api';
import Type from './type';
import { Context } from '../context';
import { TypeOptions } from './api';
export interface TypeCommandOptions extends TypeOptions<boolean>, PositionalOptions {
    api?: Api;
    setup?: Function;
    run?: Function;
    paramsDsl?: string;
}
export interface PositionalOptions {
    'params'?: string[];
    'paramsDescription'?: string[];
    'paramsDesc'?: string[];
    'paramsGroup'?: string[];
    'ignore'?: boolean;
}
export declare class TypeCommand extends Type<boolean> {
    static get(opts?: TypeCommandOptions): TypeCommand;
    private _api?;
    private _apiConfigured?;
    private _positionalOpts?;
    private _positionalDsl?;
    private _setupHandler?;
    private _runHandler?;
    private _default?;
    private _validAliases?;
    constructor(opts?: TypeCommandOptions);
    configure(opts?: TypeCommandOptions, override?: boolean): this;
    _assignPositionalOpts(target: PositionalOptions, source: PositionalOptions): PositionalOptions;
    _initPossibleHelpBuffer(context: Context): {};
    get needsApi(): boolean;
    get api(): Api;
    get isDefault(): boolean;
    get validAliases(): string[];
    get setupHandler(): Function;
    get runHandler(): Function;
    get datatype(): string;
    get isHidden(): boolean;
    buildHelpHints(hints: string[]): void;
    get helpGroup(): string;
    parse(context: Context): Promise<this>;
    postParse(context: Context): Promise<any>;
}
export default TypeCommand;
