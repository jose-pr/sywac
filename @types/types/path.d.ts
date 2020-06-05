/// <reference types="node" />
import { TypeOptions } from "./type";
import TypeString from "./string";
import { Context } from "../context";
import fs from 'fs';
import path from 'path';
export interface TypePathOptions extends TypeOptions<string> {
    dirAllowed?: boolean;
    fileAllowed?: boolean;
    normalize?: boolean;
    asObject?: boolean;
    asPosix?: boolean;
    asWin32?: boolean;
    fsLib?: typeof fs;
    pathLib?: typeof path;
    mustExist?: boolean;
}
declare class TypePath extends TypeString {
    static get(opts: TypePathOptions): TypePath;
    private _pathLib?;
    private _fsLib?;
    private _dirAllowed?;
    private _fileAllowed?;
    private _normalize?;
    private _asObject?;
    private _asPosix?;
    private _asWin32?;
    private _mustExist?;
    constructor(opts?: TypePathOptions);
    configure(opts?: TypePathOptions, override?: boolean): this;
    get datatype(): "path" | "file" | "dir";
    get fulltype(): "path" | "file" | "directory";
    buildHelpHints(hints: string[]): void;
    get pathLib(): any;
    get fsLib(): any;
    get isStrict(): boolean;
    get shouldValidateDefaultValue(): boolean;
    validateValue(value: string, context: Context): true | Promise<boolean>;
    handleStatErr(err: NodeJS.ErrnoException, context: Context, value: string): void;
    handleStats(stats: fs.Stats, context: Context, value: string): void;
    getValue(context: Context): string;
}
export default TypePath;