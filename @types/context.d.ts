/// <reference types="node" />
import path from "path";
import fs from "fs";
export interface ContextOptions {
    utils?: unknown;
    pathLib?: typeof path;
    fsLib?: typeof fs;
    state?: unknown;
}
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
export declare type DeferVersion = {
    version?: string | Function;
};
export declare type HelBuffer = {
    groups: Record<string, TypeObject[]>;
    _usageName: string;
    toString(o: {}): string;
    messages: string[];
};
export declare type Source = {
    source: string;
    position: number[];
    raw: string[];
};
export interface TypeObject {
    id: string;
    aliases: string[];
    datatype: string;
    isRequired: boolean;
    helpFlags: string;
    helpDesc: string;
    helpHints: string;
    helpGroup: string;
    isHidden: boolean;
    invalid?: boolean;
    parent?: string;
    value?: unknown;
    source?: string;
    position?: number[];
    raw?: string[];
}
export declare class Context {
    static get(opts?: ContextOptions): Context;
    private _utils;
    private _pathLib?;
    private _fsLib?;
    private state;
    types: Record<string, undefined | TypeObject[]>;
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
        types: TypeObject[];
    };
    errors: (string | undefined | Error)[];
    messages: string[];
    commandHandlerRun: boolean;
    helpRequested: {};
    helpRequestedImplicitly: boolean;
    versionRequested: DeferVersion | false;
    constructor(opts?: ContextOptions);
    get utils(): any;
    get pathLib(): path.PlatformPath | undefined;
    get fsLib(): typeof fs | undefined;
    slurpArgs(args: string | string[]): this;
    parseSingleArg(arg: string): {
        key: string;
        value: string | boolean;
    }[];
    pushLevel(level: string, types: TypeObject[]): this;
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
    populateArgv(typeResults: Partial<TypeObject>[]): void;
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
            types: TypeObject[];
        };
    };
}
