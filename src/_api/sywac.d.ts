import { FactoryProvider } from "./factory";
import { SywacOptions } from "./options";
import { Sywac } from ".";
import {ParsedDetails, ParsedArg} from "./context"

export interface SywacProvider<A = {}> extends FactoryProvider<SywacOptions, Sywac<A>> {
    readonly DEFAULT_COMMAND_INDICATOR: string
    /**Defined by first Api instance in constructor*/
    readonly ROOT_NAME?: string
    readonly SOURCE_DEFAULT: string
    readonly SOURCE_FLAG: string
    readonly SOURCE_POSITIONAL: string
}
export declare interface SywacExtensions<A extends {}> {

}
export declare interface Sywac<A extends {} = {}> extends SywacExtensions<A> {

    readonly SYWAC: SywacProvider
    /**
     * @summary Parse given args, validate them according to configuration, execute any commands found, and return the detailed results of execution on resolution.
     * @description
     * This method is suitable for any application use. It treats each call as a stateless operation, accepting the input it needs and returning (as a Promise) the output result. It makes no assumptions about the application and therefore does not call any methods like console.log() or process.exit(). Rather, any potential output content (like help text) or error status (like an exit code) is reported in the result.
     * 
     * Note that this method is safe to use concurrently, meaning it is suitable for server-side apps that may handle many concurrent requests (e.g. a REST/HTTP service) or process many concurrent messages (e.g. a chatbot).
     * 
     * Example passing an explicit message to parse:
     * ```js
        const msg = 'hello --name world'
        sywac.parse(msg).then(result => {
        console.log(JSON.stringify(result, null, 2))
        if (result.output) return respond(result.output)
        if (result.code !== 0) return respond('Error!', result.errors)
        return respond('Success')
        })
        ```
     * @since 1.0,0
     * @param args The arguments or message to parse, validate, and execute. Defaults to: `process.argv.slice(2)`
     * @returns Promise that resolves to a result object
     */
    parse(args?: string | string[]): Promise<ArgParsed<A>>
    /**
     *This method is a wrapper around the {@link parse} method that is suitable for CLI apps.
     * @remarks
     * If the result of parsing/validation/execution includes output (i.e. help text or validation messages) or indicates an error (i.e. result.code !== 0), then this method will automatically print the output to stdout (via console.log()) and exit the process (via process.exit(result.code)).
     * 
     * If the result does not include output and has a zero exit code, then a Promise is returned that resolves to result.argv. If your app logic needs access to the detailed results (beyond just the parsed argv), use the parse method instead.
     * 
     *@note In a command-driven app, it may be perfectly reasonable to call this method and do nothing with the returned Promise, because command execution will have already completed.
     *@examples -
     * __CODE__:
     *```js
     * sywac.parseAndExit().then(argv => {
     *   console.log(argv)
     * })
     * ```
     * 
     * @since  `1.0.0`
     * @param args The arguments or message to parse, validate, and execute. Defaults to: `process.argv.slice(2)`
     * @returns Promise that resolves to the {@linkcode ArgParsed.argv}
     * @throws Error
     * @throws Test
     */
    parseAndExit(args?: string | string[]): Promise<Argv<A>>
    /**
     * Define any custom validation logic to run after all types have been parsed, validated, and coerced. The handler will not be called if help or version are explicitly requested.
     *#Example
     *```js
     *require('sywac')
     *.file('-f <file>', {
     *  desc: 'Path to JSON file, optional, implies -k <key>',
     *       mustExist: true
     *})
     *  .string('-k <key>', {
     *       desc: 'A key in JSON file, optional, implies -f <file>'
     *   })
     *   .check((argv, context) => {
     *       if (!argv.f && !argv.k) return
     *       // sync validation, fail-fast
     *       if (!argv.k) {
     *       return context.cliMessage('Cannot specify a file without a key')
     *       }
     *       if (!argv.f) {
     *       return context.cliMessage('Cannot specify a key without a file')
     *       }
     *       // async validation
     *       return new Promise((resolve, reject) => {
     *          require('fs').readFile(argv.f, 'utf8', (err, data) => {
     *              if (err) return reject(err)
     *          data = JSON.parse(data)
     *          if (!data[argv.k]) {
     *              return resolve(context.cliMessage(`File missing key ${argv.k}`))
     *          }
     *          argv.value = data[argv.k]
     *          resolve()
     *      })
     *  })
     *})
     *.parseAndExit()
     *.then(argv => console.log(argv))
     *```
     *@since 1.0.0
     *@param handler An asynchronous function (may return a Promise) which may perform custom validation before control is returned to app logic.
     *The function should report validation errors using the context.cliMessage(msg) method. If the function throws or returns a rejected Promise, an unexpected error will be given in resolved parsing results. If no messages are added to the context and the handler doesn’t throw or return a rejected Promise, validation is assumed to be successful. If the function returns a Promise, sywac will wait until it resolves or rejects before continuing.
     *@returns the Api instance for method chaining.
     */
    check(handler: SywacHandler): this

    /**
     * @since 1.0.0
     * @summary Configure the Api instance directly.
     * @returns the Api instance for method chaining. [[`Sywac`]]
     * @example sywac.configure({ name: 'example' }) 
     */
    configure(opts: ApiOptions): this
}

export type Argv<A> = {
    _?: string[]
} & A
export interface ArgParsed<A extends {}> {
    /**
     * Represents the exit code or error status of parsing, as the number of errors encountered.
     * 
     * A value of `0` represents success, while a non-zero value means at least one validation or unexpected error occurred.
     *
     * Validation error messages will be included in output (typically along with help text) but will not be included in errors.
     * 
     * Unexpected errors will be included in errors and formatted in output.
     */
    code: number
    /**
     * @summary Buffered content containing any messages (delimited by '\n') resulting from parsing.
     * @description
     * It is intended that output is suitable as a formatted response to the user. In a CLI application, you can use console.log(output) or similar, which the parseAndExit method will do for you.
     * 
     * It is also intended that output will be an empty string unless errors occurred. While the framework sticks to this contract, any commands defined by the application are free to add their own messages to output via the context.cliMessage(msg) method, which may or may not represent error messages.
     */
    output: string
    /**
     * @summary Represents any unexpected errors that occurred during parsing, validation, or execution.
     * @description
     * Note that the framework does not explicitly throw or reject internally, so any errors encountered are either the result of incorrect Api usage, your application code (custom handlers), or bugs in the framework.
     */
    errors: (Error|string|undefined)[]
    /**
     * @summary Represents the parsed arguments and options as key-value pairs, where each key is a configured alias of an argument/option and each value is the parsed/coerced value for that argument/option.
     * @description 
     * For example, an option defined with flags -s, --string <value> would result in argv.s and argv.string having the same value.
     * 
     * By default, argv will also contain a key of _, representing any unknown or unparsed flagless arguments as an array of strings, and keys for any unknown flagged options encountered, where each key represents the flag given and the value is either a boolean or a string.
     * 
     * This means that sywac can be used without configuring the Api instance, but parsed values will be crude at best. We encourage you to leverage sywac’s rich type system by configuring the Api with all expected arguments/options before parsing
     * 
     */
    argv: Argv<A>
    /**
     * Represents parsing details
     */
    details: ParsedDetails
}


export type WithOption<N extends string, A extends Sywac, O extends {} = {}> = A & {
    [n in N]: (this: Sywac, dsl: string | Conf, opts?: Conf) => A & WithOption<N, A, Conf>
}
/**
 *@param argv object representing parsed, validated, and coerced values. Each object property represents a mapping of alias to parsed value for each expected or encountered type.
 *@param context An instance representing the state of parsing and execution. Validation errors should be reported via the cliMessage(msg) method.
 */
export type SywacHandler = (argv: Argv<A>, context: Context) => Promise<void> | void
