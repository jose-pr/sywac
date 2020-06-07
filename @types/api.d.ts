/// <reference types="node" />
import fs from "fs";
import { Context } from "./context";
import { Sywac, SywacOptions, Type, Factory, TypeOptions, WithOption, SywacHandler } from "./_api";
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
export interface Api<A = {}> extends Sywac<A> {
}
export declare class Api<A = {}> {
    get SYWAC(): typeof Api;
    static get SOURCE_DEFAULT(): string;
    static get SOURCE_FLAG(): string;
    static get SOURCE_POSITIONAL(): string;
    static get DEFAULT_COMMAND_INDICATOR(): string;
    /**Defined by first Api instance in constructor*/
    static ROOT_NAME?: string;
    static get<A extends {} = {}>(opts?: SywacOptions): Sywac<A>;
    static normalizeTypeOpts<O extends TypeOptions<any>>(flags: string | string[] | Partial<O>, opts: Partial<O>): O;
    types: Type[];
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
    private constructor();
    configure(opts?: SywacOptions): this;
    newChild(commandName: string, childOptions: SywacOptions): Api<{}>;
    get unknownType(): Type<unknown, TypeOptions<unknown>>;
    get utils(): any;
    get helpOpts(): HelpOptions;
    get pathLib(): any;
    get fsLib(): typeof fs;
    get name(): string | undefined;
    get parentName(): string;
    registerFactory<T, O extends {} = {}>(name: string, factory?: Factory<O, T, Sywac<A>>): this;
    registerOption<N extends string, O extends TypeOptions<V>, V>(name: string, shorcut: N, factory?: Factory<O, Type<V>, Sywac<A>>): this & Sywac<A> & { [n in N]: (this: Sywac<{}>, dsl: any, opts?: any) => WithOption<N, Sywac<A>, O>; };
    get<O extends {}, T>(name: string, opts?: O): T | null;
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
    command(dsl: string, opts?: any): this;
    private _internalCommand;
    positional<T>(dsl: string | any, opts?: any): this;
    custom<T>(type: Type<T>): this;
    private _addOptionType;
    private _getType;
    private _getArrayType;
    option(flags: string, opts: TypeOptions<any>): this;
    check(handler: SywacHandler): this;
    parseAndExit(args?: any, state?: any): Promise<any>;
    parse(args?: string[], state?: any): Promise<any>;
    private _parse;
    parseFromContext(context: Context): Promise<Type<any, TypeOptions<any>>[]>;
    initContext(includeTypes: boolean, state: unknown): Context;
    applyTypes(context: Context): Context;
    initHelpBuffer(): any;
    shouldCoerceAndCheck(context: Context): boolean;
    getHelp(opts: any): string;
}
export default Api;
