/// <reference types="node" />
import { ContextOptions, TypeObject, TypeResult } from "./_api";
export interface ParsedArg {
    key: string;
    value: unknown;
    claimed?: boolean;
    last?: boolean;
}
export interface SlurpedArg {
    raw: string;
    index: number;
    parsed: ParsedArg[];
}
declare type Type = TypeObject & TypeResult & {
    invalid?: boolean;
};
export declare type DeferVersion = {
    version?: string | Function;
};
export declare type HelBuffer = {
    groups: Record<string, Type[]>;
    _usageName: string;
    toString(o: {}): string;
    messages: string[];
};
export declare type Source = {
    source: string;
    position: number[];
    raw: string[];
};
export declare class Context {
    static get(opts?: ContextOptions): Context;
    private _utils;
    private _pathLib?;
    private _fsLib?;
    types: Record<string, undefined | Type[]>;
    args: string[];
    slurped: SlurpedArg[];
    values: Map<string, unknown>;
    sources: Map<string, Source>;
    code: number;
    output: string;
    argv: {
        _?: string[];
    } & Record<string, unknown>;
    knownArgv: Record<string, unknown>;
    details: {
        args: string[];
        types: Type[];
    };
    errors: (string | undefined | Error)[];
    messages: string[];
    commandHandlerRun: boolean;
    helpRequested: {};
    helpRequestedImplicitly: boolean;
    versionRequested: DeferVersion | false;
    constructor(opts?: ContextOptions);
    get utils(): any;
    get pathLib(): import("path").PlatformPath | undefined;
    get fsLib(): typeof import("fs") | undefined;
    slurpArgs(args?: string | string[]): this;
    parseSingleArg(arg: string): {
        key: string;
        value: string | boolean;
    }[];
    pushLevel(level: string, types: Type[]): this;
    unexpectedError(err?: Error | string): void;
    cliMessage(...msg: string[]): void;
    markTypeInvalid(id: string): void;
    explicitCommandMatch(level: string): boolean;
    matchCommand(level: string, aliases: string[], isDefault: boolean): false | {
        explicit: boolean;
        implicit: boolean;
        candidate: string;
    };
    deferHelp(opts: {}): this;
    deferImplicitHelp(): this;
    addDeferredHelp(helpBuffer: HelBuffer): this;
    addHelp(helpBuffer: HelBuffer, opts: {}): this;
    deferVersion(opts: DeferVersion): this;
    addDeferredVersion(): this;
    assignValue(id: string, value: unknown): void;
    lookupValue(id: string): unknown;
    resetSource(id: string, source: string): void;
    employSource(id: string, source?: string | null, position?: number, raw?: string): void;
    lookupSource(id: string): Source | undefined;
    lookupSourceValue(id: string): string | undefined;
    populateArgv(typeResults: Partial<Type>[]): void;
    getUnknownArguments(): string[];
    getUnknownSlurpedOptions(): SlurpedArg[];
    toResult(): {
        code: number;
        output: string;
        errors: (string | Error | undefined)[];
        argv: {
            _?: string[] | undefined;
        } & Record<string, unknown>;
        details: {
            args: string[];
            types: Type[];
        };
    };
}
export {};
