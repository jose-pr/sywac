/// <reference types="node" />
import path from "path";
import fs from "fs";
import { Context } from "./context";
import { TypePositionalOptions } from "./types/positional";
import TypeCommand, { TypeCommandOptions } from "./types/command";
import { IFactory } from "./helpers/factory";
import { TypeOptions, IType } from "./types/api";
declare type WithOption<N extends string, A extends Api, Conf extends {} = {}> = A & {
    [n in N]: (this: Api, dsl: string | Conf, opts?: Conf) => A & WithOption<N, A, Conf>;
};
export declare interface ApiOptions {
    utils?: unknown;
    pathLib?: typeof path;
    fsLib?: typeof fs;
    factories?: Record<string, IFactory<TypeOptions<any>, IType<TypeOptions<any>, any>>>;
    name?: string;
    parentName?: string;
    helpOpts?: {};
    showHelpByDefault?: boolean;
    strictMode?: boolean;
    modulesSeen?: [];
}
declare interface OutputOptions extends Partial<{
    'lineSep': string;
    'sectionSep': string;
    'pad': string;
    'indent': string;
    'split': string;
    'maxWidth': number;
    'examplePrefix': string;
    'showHelpOnError': boolean;
}> {
}
declare interface _HelpOptions {
    'lineSep': string;
    'sectionSep': string;
    'pad': string;
    'indent': string;
    'split': string;
    'icon': string;
    'slogan': string;
    'usagePrefix': string;
    'usageHasOptions': string;
    'groupOrder': string[];
    'epilogue': string;
    'maxWidth': string;
    'examplePrefix': string;
    'exampleOrder': string[];
    'usageCommandPlaceholder': string;
    'usageArgsPlaceholder': string;
    'usageOptionsPlaceholder': string;
    'showHelpOnError': string;
    'styleGroup': string;
    'styleGroupError': string;
    'styleFlags': string;
    'styleFlagsError': string;
    'styleDesc': string;
    'styleDescError': string;
    'styleHints': string;
    'styleHintsError': string;
    'styleMessages': string;
    'styleUsagePrefix': string;
    'styleUsagePositionals': string;
    'styleUsageCommandPlaceholder': string;
    'styleUsageArgsPlaceholder': string;
    'styleUsageOptionsPlaceholder': string;
    'styleExample': string;
    'styleAll': string;
    'usage': string;
    'examples': Record<string, ExampleOptions[]>;
    usageHasArgs: boolean;
    usageHasCommand: boolean;
    usagePositionals: string[];
}
export interface ExampleOptions {
    group?: string;
    flags?: string;
}
export interface Hooks extends Partial<{
    'group': Function;
    'groupError': Function;
    'flags': Function;
    'flagsError': Function;
    'desc': Function;
    'descError': Function;
    'hints': Function;
    'hintsError': Function;
    'messages': Function;
    'usagePrefix': Function;
    'usagePositionals': Function;
    'usageCommandPlaceholder': Function;
    'usageArgsPlaceholder': Function;
    'usageOptionsPlaceholder': Function;
    'example': Function;
    'all': Function;
}> {
}
export interface HelpOptions extends Partial<_HelpOptions> {
}
export declare class Api {
    static get DEFAULT_COMMAND_INDICATOR(): string;
    static ROOT_NAME?: string;
    static get(opts?: ApiOptions): Api;
    types: IType[];
    private _helpOpts;
    private _factories;
    private _showHelpByDefault?;
    private _strictMode?;
    private _magicCommandAdded;
    private _modulesSeen;
    private _utils?;
    private _pathLib?;
    private _fsLib?;
    private _name?;
    private _parentName?;
    private _unknownType?;
    constructor(opts?: ApiOptions);
    configure(opts?: ApiOptions): this;
    newChild(commandName: string, childOptions: ApiOptions): Api;
    get unknownType(): IType<unknown, TypeOptions<unknown>> | undefined;
    get utils(): any;
    get helpOpts(): HelpOptions;
    get pathLib(): any;
    get fsLib(): typeof fs;
    get name(): string | undefined;
    get parentName(): string;
    registerFactory<T, O extends {} = {}>(name: string, factory?: IFactory<O, T>): this;
    registerOption<N extends string, O extends TypeOptions<V>, V>(name: string, shorcut: N, factory?: IFactory<O, IType<V>>): WithOption<N, this, O>;
    get(name: string, opts?: TypeOptions<unknown>): any;
    preface(icon: string, slogan: string): this;
    usage(usage: string | {
        usage?: string;
        prefix?: string;
        commandPlaceholder?: string;
        argsPlaceholder?: string;
        optionsPlaceholder?: string;
    }): this;
    groupOrder(orderArray: string[]): this;
    example(example: string, opts?: ExampleOptions): this;
    exampleOrder(orderArray: []): this;
    epilogue(epilogue: string): this;
    outputSettings(settings: OutputOptions): this;
    style(hooks: Hooks): this;
    /**
     *
     * @param boolean Defaults to `true`
     */
    showHelpByDefault(boolean?: boolean): this;
    /**
     *
     * @param boolean Defaults to `true`
     */
    strict(boolean?: boolean): this;
    addStrictModeErrors(context: Context): void;
    commandDirectory(dir: string, opts?: {
        extensions?: string[];
    }): this;
    command(dsl: string, opts?: TypeCommandOptions): this;
    _internalCommand(dsl: string, opts?: TypeCommandOptions | Function): TypeCommand;
    positional<T>(dsl: string | TypePositionalOptions<T>, opts?: TypePositionalOptions<T>): this;
    custom<T>(type: IType<T>): this;
    _normalizeOpts(flags: any, opts: any): any;
    _addOptionType(flags: any, opts: any, name: any): this;
    _getType(flags: any, opts: any, name: any): any;
    _getArrayType(flags: any, opts: any, subtypeName: any): any;
    option(flags: string, opts: TypeOptions<any>): this;
    check(handler: Function): this;
    parseAndExit(args: any, state: any): Promise<{
        _?: string[] | undefined;
    } & Record<string, unknown>>;
    parse(args: string[], state: any): Promise<{
        code: number;
        output: string;
        errors: (string | Error | undefined)[];
        argv: {
            _?: string[] | undefined;
        } & Record<string, unknown>;
        details: {
            args: string[];
            types: import("./context").TypeObject[];
        };
    }>;
    _parse(args: string[], state: unknown): Promise<Context>;
    parseFromContext(context: Context): Promise<IType<any, TypeOptions<any>>[]>;
    initContext(includeTypes: boolean, state: unknown): Context;
    applyTypes(context: Context): Context;
    initHelpBuffer(): any;
    shouldCoerceAndCheck(context: Context): boolean;
    getHelp(opts: any): string;
}
export default Api;
