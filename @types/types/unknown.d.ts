import Type from './type';
import { Context, SlurpedArg } from '../context';
import TypeImplicitCommand from './implicit';
import TypePositional from './positional';
import { TypeOptions } from './api';
export declare class TypeUnknown extends Type<unknown> {
    static get(opts: TypeOptions<unknown>): TypeUnknown;
    positionals: TypePositional<any>[];
    implicit: Record<string, TypeImplicitCommand>;
    constructor(opts: TypeOptions<unknown>);
    get datatype(): string;
    addPositional(positional: TypePositional<any>): void;
    addImplicit(aliases: string[], type: TypeImplicitCommand): void;
    parse(context: Context): Promise<this>;
    _tryImplicitCommand(unparsed: SlurpedArg[], context: Context, implicitCommands: string[]): SlurpedArg[];
    _populatePositionals(unparsed: SlurpedArg[], context: Context): SlurpedArg[];
}
