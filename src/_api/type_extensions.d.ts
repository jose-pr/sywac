import { ArgvExtension, TypeOptions } from "./index"
import { TypeBooleanOption } from "../types/boolean"
import { TypeArrayOptions } from "./options"
import { TypeCommandOptions } from "./options/command"
import { SywacHandler } from "./sywac"
interface SywacTypeExtensions<A> {
    /**
     * Add a flagged option that should be parsed as an array.
     * @examples - 
     * ```js
     *sywac.array('-s, --services <a,b,c..>', {
     *  desc: 'Specify one or more services'
     *})
     * ```
     * @param flags For example, '-a, --array <values..>' would allow -a or --array to be given when parsing.
     * @param opts Argument options
     * @returns the Api instance for method chaining.
     * @since 1.0.0
     */
    array<N extends string, T = unknown, O extends TypeArrayOptions<T> = TypeArrayOptions<T>>(flags: N | N[], opts?: O): Sywac<A & ArgvExtension<O & { aliases: N }, T[]>>
    /**
     * Add a flagged option that should be parsed as an array.
     * @param opts Argument options
     * @returns the Api instance for method chaining.
     * @since 1.0.0
     */
    array<T = unknown, O extends TypeArrayOptions<T> = TypeArrayOptions<T>>(opts: O): Sywac<A & ArgvExtension<O, T[]>>
    /**
     * Add a boolean option
     * @examples
     * ```js
     *sywac.boolean('-f, --force', {
     *  desc: 'Run the program regardless of warnings'
     *})
     * ```
     * @param flags 
     * @param opts Argument options
     * @returns the Api instance for method chaining.
     * @since 1.0.0
     */
    boolean<N extends string, O extends TypeOptions<boolean>>(flags: N | N[], opts?: O): Sywac<A & ArgvExtension<O & { aliases: N }, boolean>>
    /**
     * Add a flagged option that should be parsed as a boolean.
     * @param opts Argument options
     * @returns the Api instance for method chaining.
     * @since 1.0.0
     */
    boolean<O extends TypeOptions<boolean>>(opts: O): Sywac<A & ArgvExtension<O, boolean>>
    /**
     * Add a command that should be executed when encountered during parsing.
     * @examples -
     * ```js
     *sywac.command('remote <subcommand> [args]', {
     *    desc: 'Work with remotes via subcommand',
     *    ignore: ['<subcommand>', '[args]'],
     *    setup: sywac => {
     *        sywac
     *            .command('add <name> <url>', {
     *                desc: 'Add a new remote',
     *                paramsDesc: ['The name of the remote', 'The url of the remote'],
     *                run: (argv, context) => {
     *                    if (remoteExists(argv.name)) {
     *                        return context.cliMessage(`Remote ${argv.name} already exists`)
     *                    }
     *                    console.log(`adding remote ${argv.name} with url ${argv.url}`)
     *                }
     *            })
     *            .command('prune [name=origin]', {
     *                desc: 'Remove stale remote tracking branches',
     *                paramsDesc: 'Optionally specify the remote to prune',
     *                run: argv => console.log(`pruning ${argv.name}`)
     *            })
     *    }
     * ```
     *@examples -
     * ```js
     *sywac.commmand('get <key>', argv => console.log(`looking up key ${argv.key}`))
     * ```
     *@examples -
     * ```js
     *sywac.commmand(opts?:TypeCommandOptions&{flags:string})
     * ```
     * @remarks 
     * if first argument is not a string then the dsl string should be specified via the flags property(similar to other types)
     * If the canonical alias is *, the command will be considered a default command and will be hidden from help text unless a non -default alias is defined in opts.
     * Since the dsl string will be used in help text(by default ), it may contain content that should not be treated as explicit positional args, as long as you specify the ignore option in opts.
     * @param dsl it defines the canonical alias of the command and any positional arguments the command may accept.The first word in the string represents the canonical alias and any subsequent content will be treated as positional arguments. 
     * @param opts it defines configuration for the command, if a function defines the run handler for the command.
     * @returns the Api instance for method chaining.
     * @since 1.0.0
     */
    command(dsl: string, opts: TypeCommandOptions|SywacHandler):this
    command(opts: TypeCommandOptions):this
}
