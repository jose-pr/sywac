//@ts-ignore
import Type from './type'
import { Sywac, TypeOptions, Context } from '../_api'

export interface TypeCommandOptions<A> extends TypeOptions<boolean>, PositionalOptions {
  api?: Sywac<A>
  setup?: Function
  run?: Function
  paramsDsl?: string
}
export interface PositionalOptions {
  'params'?: string[]
  'paramsDescription'?: string[]
  'paramsDesc'?: string[]
  'paramsGroup'?: string[]
  'ignore'?: boolean
}
export class TypeCommand<A> extends Type<boolean> {
  static get<A>(opts?: TypeCommandOptions<A>) {
    return new TypeCommand(opts)
  }

  private _api?: Sywac
  private _apiConfigured?: boolean
  private _positionalOpts?: PositionalOptions
  private _positionalDsl?: string
  private _setupHandler?: Function
  private _runHandler?: Function
  private _default?: boolean
  private _validAliases?: string[]

  private constructor(opts?: TypeCommandOptions<A>) {
    // default value is for benefit of context.details.types
    super(Object.assign({ defaultValue: false }, opts))
  }

  configure(opts?: TypeCommandOptions<A>, override?: boolean) {
    opts = opts || {} as TypeCommandOptions<A>
    if (typeof override === 'undefined') override = true
    super.configure(opts, override)

    if (override || !this._api) {
      this._api = opts.api || this._api
      if (opts.api) this._apiConfigured = false
    }
    if (override || !this._positionalOpts) this._positionalOpts = this._assignPositionalOpts(this._positionalOpts || {} as PositionalOptions, opts)
    if (override || !this._positionalDsl) this._positionalDsl = opts.paramsDsl || this._positionalDsl
    if (override || typeof this._setupHandler !== 'function') this._setupHandler = opts.setup || this._setupHandler
    if (override || typeof this._runHandler !== 'function') this._runHandler = opts.run || this._runHandler

    return this
  }

  _assignPositionalOpts(target: PositionalOptions, source: PositionalOptions) {
    ['params', 'paramsDescription', 'paramsDesc', 'paramsGroup', 'ignore'].forEach(opt => {
      //@ts-ignore
      if (opt in source) target[opt] = source[opt]
    })
    return target
  }

  // if user requests help or a `setup` or `run` callback generates CLI messages,
  // we need to initialize the help buffer in the context of this command.
  _initPossibleHelpBuffer(context: Context) {
    const result = context.helpRequested || context.messages.length
    //@ts-ignore
    if (result && !context.output) context.addDeferredHelp(this.api.initHelpBuffer())
    return result
  }

  get needsApi() {
    return !this._api
  }

  get api() {
    if (!this._api) this._api = TypeCommand.SYWAC.get({})
    return this._api
  }

  get isDefault() {
    if (typeof this._default !== 'boolean') this._default = this.aliases.some(alias => alias === TypeCommand.SYWAC.DEFAULT_COMMAND_INDICATOR)
    return this._default
  }

  get validAliases() {
    if (!Array.isArray(this._validAliases)) this._validAliases = this.aliases.filter(alias => alias !== TypeCommand.SYWAC.DEFAULT_COMMAND_INDICATOR)
    return this._validAliases
  }

  get setupHandler() {
    return typeof this._setupHandler === 'function' ? this._setupHandler : () => { }
  }

  get runHandler() {
    return typeof this._runHandler === 'function' ? this._runHandler : () => { }
  }

  get datatype() {
    return 'command'
  }

  get isHidden() {
    if (this.aliases.length === 1 && this.isDefault) return true
    return super.isHidden
  }

  buildHelpHints(hints: string[]) {
    if (this.validAliases.length > 1) hints.push('aliases: ' + this.validAliases.slice(1).join(', '))
    if (this.isDefault) hints.push('default')
  }

  get helpGroup() {
    return this._group || 'Commands:'
  }

  parse(context: Context) {
    return super.resolve()
  }

  async postParse(context: Context) {
    //@ts-ignore
    const match = context.matchCommand(this.api.parentName, this.validAliases, this.isDefault) as { explicit: boolean, implicit: boolean, candidate?: string }
    if (!match.explicit && !match.implicit) return this.resolve()

    if (match.explicit) {
      // "claim" the arg from context.slurped so logic in unknownType works
      const matchedArg = context.slurped.find(arg => {
        return arg.parsed.length === 1 && !arg.parsed[0].key && !arg.parsed[0].claimed && arg.raw === match.candidate
      })
      if (matchedArg) {
        matchedArg.parsed[0].claimed = true
        this.applySource(context, TypeCommand.SYWAC.SOURCE_POSITIONAL, matchedArg.index, matchedArg.raw)
      }
    }
    this.setValue(context, true) // set this value to true for context.details
    context.populateArgv([this.toResult(context)]) // apply value to context.details

    if (!this._apiConfigured) {
      this._apiConfigured = true
      // add positionals from preconfigured opts
      if (typeof this._positionalDsl === 'string' && this._positionalDsl.length) {
        //@ts-ignore
        this.api.positional(this._positionalDsl, this._positionalOpts)
      } else if (this._positionalOpts && this._positionalOpts.params) {
        //@ts-ignore
        this.api.positional(this._positionalOpts)
      }

      // TODO add other types from preconfigured opts ?

      // call sync "setup" handler, if defined
      this.setupHandler(this.api)
    }
    //@ts-ignore
    await this.api.parseFromContext(context)

    // only run innermost command handler
    if (context.commandHandlerRun) return this.resolve()
    context.commandHandlerRun = true
    //@ts-ignore
    this.api.addStrictModeErrors(context)
    if (this._initPossibleHelpBuffer(context)) return this.resolve()

    const result = await this.runHandler(context.argv, context)
    this._initPossibleHelpBuffer(context)
    return result
  }
}

export default TypeCommand
