import { FactoryProvider } from "./factory";
import { ContextOptions } from "./options";
import { TypeResult } from "./sywac";

export export type Argv<A> = {
    _?: string[]
} & A

export interface ParsedArg {
    key: string,
    value: unknown,
    claimed?: boolean,
    last?: boolean,
}

export interface SlurpedArg {
    raw: string,
    index: number,
    parsed: ParsedArg[]
}

export interface Context<A extends {} = {}> {
    readonly utils: any
    readonly pathLib: typeof import("path")
    readonly fsLib: typeof import("fs")
    helpRequested: boolean
    messages: string[]

    populateArgv(results: TypeResult[])
    slurped: SlurpedArg[]
    commandHandlerRun: boolean

    argv: Argv<A>
    assignValue(id: string, value: unknown): void
    lookupValue<V = unknown>(id: string): V | string | undefined

    slurpArgs(args?: string | string[]): this
}