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

export interface HelpBufferOptions {
    includePreface?: boolean
    includeUsage?: boolean
    includeGroups?: boolean
    includeExamples?: boolean
    includeEpilogue?: boolean
}

export interface ParsedDetails {
    /**
     * The args used for parsing, which is the same as input to this method, translated to an array.
     */
    args: string[]
    /**
     * Each object represents detailed parsing results for all expected/configured Type instances
     */
    types: TypeResult[]
}
/**
 * Represents detailed parsing results for configured Type instance
 */
export interface TypeResult {
    /**
     * All configured aliases for the Type instance
     */
    aliases: string[],
    /**
     * The underlying datatype represented by the Type instance
     */
    datatype: string,
    /**
     * Represents the command level the Type applies to
     */
    parent: string
    /**
     * The parsed/coerced value of the Type instance
     */
    value?: unknown
    /**
     * Represents how the input value was defined (e.g. 'default', 'flag', 'positional', 'env')
     */
    source?: string
    /**
     *  Represents the indexes (if any) in args used as input values for this Type instance
     */
    position?: number[]
    /**
     * Represents the unparsed input values for this Type instance
     */
    raw?: string[]
}

export type Source = { source: string, position: number[], raw: string[] }

export interface Context<A extends {} = {}> {
    readonly utils: any
    readonly pathLib: typeof import("path")
    readonly fsLib: typeof import("fs")
    helpRequested: boolean
    messages: string[]


    details: ParsedDetails

    args: string[]
    argv: Argv<A>
    populateArgv(results: TypeResult[])
    employSource(id: string, source?: string | null, position?: number, raw?: string): void
    slurped: SlurpedArg[]

    commandHandlerRun: boolean

    assignValue(id: string, value: unknown): void
    lookupValue<V = unknown>(id: string): V | string | undefined


    lookupSource(id: string): Source
    lookupSourceValue(id: string): string | undefined
    resetSource(id: string, source: string): void
    employSource(id: string, source?: string | null, position?: number, raw?: string): void


    cliMessage(...msg: string[]): void
    markTypeInvalid(id: string): void


    deferHelp(opts?: HelpBufferOptions): this
    deferVersion(opts?: { version?: string }): this



    slurpArgs(args?: string | string[]): this
}