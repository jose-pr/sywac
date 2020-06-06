import path from "path"
import fs from "fs";
import { Context } from "./context";
import { TypePositionalOptions } from "./types/positional";
import TypeCommand, { TypeCommandOptions } from "./types/command";
import { IFactory, registerProvidedFactories, assignOpts } from "./helpers/factory";
import { TypeOptions, IType, SOURCE_CONSTANTS } from "./types/api";

type WithOption<N extends string, A extends Api, Conf extends {} = {}> = A & {
  [n in N]: (this: Api, dsl: string | Conf, opts?: Conf) => A & WithOption<N, A, Conf>
}

export declare interface ApiOptions {
  utils?: unknown
  pathLib?: typeof path
  fsLib?: typeof fs
  factories?: Record<string, IFactory<TypeOptions<any>, IType<TypeOptions<any>,any>>>
  name?: string
  parentName?: string
  helpOpts?: {}
  showHelpByDefault?: boolean
  strictMode?: boolean
  modulesSeen?: []
}
declare interface OutputOptions extends Partial<{
  'lineSep': string
  'sectionSep': string
  'pad': string
  'indent': string
  'split': string
  'maxWidth': number
  'examplePrefix': string
  'showHelpOnError': boolean
}> { }
declare interface _HelpOptions {
  'lineSep': string
  'sectionSep': string
  'pad': string
  'indent': string
  'split': string
  'icon': string
  'slogan': string
  'usagePrefix': string
  'usageHasOptions': string
  'groupOrder': string[]
  'epilogue': string
  'maxWidth': string
  'examplePrefix': string
  'exampleOrder': string[]
  'usageCommandPlaceholder': string
  'usageArgsPlaceholder': string
  'usageOptionsPlaceholder': string
  'showHelpOnError': string
  'styleGroup': string
  'styleGroupError': string
  'styleFlags': string
  'styleFlagsError': string
  'styleDesc': string
  'styleDescError': string
  'styleHints': string
  'styleHintsError': string
  'styleMessages': string
  'styleUsagePrefix': string
  'styleUsagePositionals': string
  'styleUsageCommandPlaceholder': string
  'styleUsageArgsPlaceholder': string
  'styleUsageOptionsPlaceholder': string
  'styleExample': string
  'styleAll': string
  'usage': string
  'examples': Record<string, ExampleOptions[]>
  usageHasArgs: boolean
  usageHasCommand: boolean
  usagePositionals: string[]
}
export interface ExampleOptions {
  group?: string
  flags?: string
}
export interface Hooks extends Partial<{
  'group': Function
  'groupError': Function
  'flags': Function
  'flagsError': Function
  'desc': Function
  'descError': Function
  'hints': Function
  'hintsError': Function
  'messages': Function
  'usagePrefix': Function
  'usagePositionals': Function
  'usageCommandPlaceholder': Function
  'usageArgsPlaceholder': Function
  'usageOptionsPlaceholder': Function
  'example': Function
  'all': Function
}> { }
export interface HelpOptions extends Partial<_HelpOptions> { }
const HELP_OPTS = [
  'lineSep', 'sectionSep', 'pad', 'indent', 'split', 'icon', 'slogan',
  'usagePrefix', 'usageHasOptions', 'groupOrder', 'epilogue', 'maxWidth',
  'examplePrefix', 'exampleOrder', 'usageCommandPlaceholder',
  'usageArgsPlaceholder', 'usageOptionsPlaceholder', 'showHelpOnError',
  'styleGroup', 'styleGroupError', 'styleFlags', 'styleFlagsError',
  'styleDesc', 'styleDescError', 'styleHints', 'styleHintsError', 'styleMessages',
  'styleUsagePrefix', 'styleUsagePositionals', 'styleUsageCommandPlaceholder',
  'styleUsageArgsPlaceholder', 'styleUsageOptionsPlaceholder', 'styleExample',
  'styleAll'
] as (keyof HelpOptions)[]

export class Api {
  static get DEFAULT_COMMAND_INDICATOR() {
    return '*'
  }
  static ROOT_NAME?: string
  static get(opts?: ApiOptions) {
    return new Api(opts)
  }
  types: IType[] = []
  private _helpOpts: HelpOptions
  private _factories: Record<string, IFactory<any, any>> = {}
  private _showHelpByDefault?: boolean
  private _strictMode?: boolean
  private _magicCommandAdded: boolean = false;
  private _modulesSeen: string[]
  private _utils?: any
  private _pathLib?: any
  private _fsLib?: any
  private _name?: string
  private _parentName?: string
  private _unknownType?: IType<unknown>

  constructor(opts?: ApiOptions) {
    opts = opts ?? {}
    this._helpOpts = opts.helpOpts ?? {}
    this._showHelpByDefault = opts?.showHelpByDefault ?? false
    this._strictMode = opts.strictMode ?? false
    this._modulesSeen = opts.modulesSeen ?? []
    registerProvidedFactories(this);
    this.configure(opts)
    if (!Api.ROOT_NAME) Api.ROOT_NAME = this.name
  }

  configure(opts?: ApiOptions) {
    opts = opts ?? {} as ApiOptions
    // lazily configured instance dependencies (expects a single instance)
    this._utils = opts.utils || this._utils
    this._pathLib = opts.pathLib || this._pathLib
    this._fsLib = opts.fsLib || this._fsLib

    // lazily configured factory dependencies (expects a function to call per instance)
    if (opts.factories) {
      Object.keys(opts.factories).forEach(name => this.registerFactory(name, opts!.factories![name]))
    }

    // other
    this._name = opts.name || this._name
    this._parentName = opts.parentName || this._parentName // TODO this seems awfully hacky
    return this
  }

  newChild(commandName: string, childOptions: ApiOptions) {
    return new Api(Object.assign({
      factories: this._factories,
      utils: this.utils,
      pathLib: this.pathLib,
      fsLib: this.fsLib,
      name: this.name + ' ' + commandName,
      parentName: this.name,
      modulesSeen: this._modulesSeen.slice(),
      helpOpts: assignOpts({}, this.helpOpts, HELP_OPTS),
      showHelpByDefault: this._showHelpByDefault,
      strictMode: this._strictMode
    }, childOptions))
  }

  // lazy dependency accessors
  get unknownType() {
    if (!this._unknownType) this._unknownType = this.get('unknownType')!.withParent(Api.ROOT_NAME!)
    return this._unknownType
  }

  get utils() {
    if (!this._utils) this._utils = require('./lib/utils').get()
    return this._utils
  }

  get helpOpts() {
    return this._helpOpts
  }

  get pathLib() {
    if (!this._pathLib) this._pathLib = require('path')
    return this._pathLib
  }

  get fsLib(): typeof fs {
    if (!this._fsLib) this._fsLib = require('fs')
    return this._fsLib
  }

  get name() {
    if (typeof this._name !== 'string') this._name = this.pathLib.basename(process.argv[1], '.js')
    return this._name
  }

  get parentName() {
    return this._parentName || 'node'
  }

  // type factories
  registerFactory<T, O extends {} = {}>(name: string, factory?: IFactory<O, T>) {
    if (name && typeof factory === 'function') this._factories[name] = factory
    return this
  }
  registerOption<N extends string, O extends TypeOptions<V>, V>(name: string, shorcut: N, factory?: IFactory<O, IType<V>>) {
    const that = this as WithOption<N, this, O>;
    if (factory) this.registerFactory(name, factory);
      that[shorcut] = ((flags: string | O, opts?: O) => {
        return that._addOptionType(flags, opts, 'helpType') as this & WithOption<N, this, O>
      }) as WithOption<N, this, O>[N]
    return that
  }

  get(name: string, opts?: TypeOptions<unknown>) {
    if (name && this._factories[name]) return this._factories[name].call(this, opts)
    return null
  }


  // help text
  preface(icon: string, slogan: string) {
    this.helpOpts.icon = icon
    this.helpOpts.slogan = slogan
    return this
  }

  usage(usage: string | {
    usage?: string,
    prefix?: string,
    commandPlaceholder?: string,
    argsPlaceholder?: string,
    optionsPlaceholder?: string
  }) {
    if (typeof usage === 'string') this.helpOpts.usage = usage
    else if (usage) {
      const keyMap = {
        usage: 'usage',
        prefix: 'usagePrefix',
        commandPlaceholder: 'usageCommandPlaceholder',
        argsPlaceholder: 'usageArgsPlaceholder',
        optionsPlaceholder: 'usageOptionsPlaceholder'
      }
      Object.keys(keyMap).forEach(key => {
        //@ts-ignore
        if (key in usage) this.helpOpts[keyMap[key]] = usage[key]
      })
    }
    return this
  }

  groupOrder(orderArray: string[]) {
    if (Array.isArray(orderArray) || typeof orderArray === 'undefined') this.helpOpts.groupOrder = orderArray
    return this
  }

  example(example: string, opts?: ExampleOptions) {
    opts = opts || {}
    if (typeof example === 'string') {
      opts.flags = example
    } else if (!Array.isArray(example) && typeof example === 'object') {
      opts = example
    }
    const group = opts.group || 'Examples:'
    if (!this.helpOpts.examples) this.helpOpts.examples = {}
    this.helpOpts.examples[group] = (this.helpOpts.examples[group] || []).concat(opts)
    return this
  }

  exampleOrder(orderArray: []) {
    if (Array.isArray(orderArray) || typeof orderArray === 'undefined') this.helpOpts.exampleOrder = orderArray
    return this
  }

  epilogue(epilogue: string) {
    this.helpOpts.epilogue = epilogue
    return this
  }

  outputSettings(settings: OutputOptions) {
    if (!settings) return this
      ;['lineSep', 'sectionSep', 'pad', 'indent', 'split', 'maxWidth', 'examplePrefix', 'showHelpOnError'].forEach(opt => {
        //@ts-ignore
        if (opt in settings) this.helpOpts[opt] = settings[opt]
      })
    return this
  }

  style(hooks: Hooks) {
    if (!hooks) return this
      ;[
        'group', 'groupError', 'flags', 'flagsError', 'desc', 'descError', 'hints',
        'hintsError', 'messages', 'usagePrefix', 'usagePositionals', 'usageCommandPlaceholder',
        'usageArgsPlaceholder', 'usageOptionsPlaceholder', 'example', 'all'
      ].forEach(key => {
        //@ts-ignore
        if (typeof hooks[key] === 'function') {
          const helpOptsKey = 'style' + key[0].toUpperCase() + key.slice(1)
          //@ts-ignore
          this.helpOpts[helpOptsKey] = hooks[key]
        }
      })
    return this
  }
  /**
   * 
   * @param boolean Defaults to `true`
   */
  showHelpByDefault(boolean?: boolean) {
    this._showHelpByDefault = boolean !== false
    return this
  }
  /**
   * 
   * @param boolean Defaults to `true`
   */
  strict(boolean?: boolean) {
    this._strictMode = boolean !== false
    return this
  }

  addStrictModeErrors(context: Context) {
    if (this._strictMode) {
      const unknownOptions = context.getUnknownSlurpedOptions()
      if (unknownOptions.length > 0) {
        context.cliMessage(`Unknown options: ${unknownOptions.map(u => u.raw).join(', ')}`)
      }
      const unknownArguments = context.getUnknownArguments()
      if (unknownArguments.length > 0) {
        context.cliMessage(`Unknown arguments: ${unknownArguments.join(' ')}`)
      }
    }
  }

  // complex types
  commandDirectory(dir: string, opts?: {
    extensions?: string[]
  }) {
    if (typeof dir === 'object') {
      opts = dir
      dir = ''
    }
    opts = Object.assign({}, opts)
    if (!Array.isArray(opts.extensions)) opts.extensions = ['.js']
    let searchDir: string
    if (dir && typeof dir === 'string' && this.pathLib.isAbsolute(dir)) {
      searchDir = dir
    } else {
      const callerFile: string = this.utils.getCallerFile()
      if (this._modulesSeen.indexOf(callerFile) === -1) this._modulesSeen.push(callerFile)
      searchDir = this.pathLib.dirname(callerFile)
      if (dir && typeof dir === 'string') searchDir = this.pathLib.resolve(searchDir, dir)
    }
    let filepath
    let mod
    this.fsLib.readdirSync(searchDir).forEach(fileInDir => {
      filepath = this.pathLib.join(searchDir, fileInDir)
      if (opts!.extensions!.indexOf(this.pathLib.extname(fileInDir)) !== -1 && this._modulesSeen.indexOf(filepath) === -1) {
        this._modulesSeen.push(filepath)
        mod = require(filepath)
        if (mod.flags || mod.aliases) {
          this._internalCommand(mod)
        } else if (typeof mod === 'function') {
          //@ts-ignore
          this._internalCommand({
            aliases: this.pathLib.basename(fileInDir, this.pathLib.extname(fileInDir)),
            run: mod
          })
        }
      }
    })
    return this
  }

  command(dsl: string, opts?: TypeCommandOptions) {
    this._internalCommand(dsl, opts)
    return this
  }

  _internalCommand(dsl: string, opts?: TypeCommandOptions | Function) {
    opts = opts || {} as TypeCommandOptions

    // argument shuffling
    if (typeof opts === 'function') {
      opts = { run: opts } as TypeCommandOptions
    }
    if (dsl && typeof dsl === 'object') {
      opts = Object.assign({}, dsl, opts)
    } else if (typeof dsl === 'string') {
      opts = Object.assign({}, opts)
      opts.flags = dsl
    } else {
      opts = Object.assign({}, opts)
    }
    if (!opts.flags && opts.aliases) opts.flags = ([] as string[]).concat(opts.aliases)[0]

    // opts is an object and opts.flags is the dsl
    // split dsl into name/alias and positionals
    // then populate opts.aliases and opts.params
    const mp = this.utils.stringToMultiPositional(opts.flags)
    const name = mp.shift()
    opts.aliases = opts.aliases ? Array.from(new Set([name].concat(opts.aliases))) : [name]
    if (mp.length) {
      this.helpOpts.usageHasArgs = true
      if (!opts.params) opts.params = mp
      else if (!opts.paramsDsl) opts.paramsDsl = mp.join(' ')
    }

    this.helpOpts.usageHasCommand = true

    const commandType = this.get('commandType', opts) as TypeCommand
    this.custom(commandType)
    return commandType
  }

  positional<T>(dsl: string | TypePositionalOptions<T>, opts?: TypePositionalOptions<T>) {
    opts = Object.assign({}, opts) // copy object so we don't alter object with external refs
    let addedToHelp = false

    // TODO this logic is repetitive and messy
    if (Array.isArray(dsl)) {
      opts.params = dsl.slice()
    } else if (typeof dsl === 'object') {
      if (dsl.params) opts = Object.assign({}, dsl)
      else opts.params = Object.assign({}, dsl)
    } else if (typeof dsl === 'string') {
      this.helpOpts.usagePositionals = (this.helpOpts.usagePositionals || []).concat(dsl)
      addedToHelp = true
      const array = this.utils.stringToMultiPositional(dsl) as string[]
      if (!opts.params) {
        opts.params = array
      } else if (Array.isArray(opts.params)) {
        opts.params = array.map((string, index) => {
          //@ts-ignore
          return opts.params[index] ? Object.assign({ flags: string }, opts.params[index]) : string
        })
      } else {
        opts.params = Object.keys(opts.params).map((key, index) => {
          //@ts-ignore
          let obj = opts.params[key]
          if (obj && !obj.flags) obj = Object.assign({ flags: array[index] }, obj)
          // if (obj && !obj.aliases) obj.aliases = key
          return obj
        })
      }
    }
    //@ts-ignore
    opts.ignore = [].concat(opts.ignore).filter(Boolean)

    const params = Array.isArray(opts.params) ? opts.params.slice() : Object.keys(opts.params).map(key => {
      //@ts-ignore
      let obj = opts.params[key]
      if (obj && !obj.flags) obj = Object.assign({ flags: key }, obj)
      return obj
    })

    let numSkipped = 0
    params.forEach((param, index) => {
      if (!param) return numSkipped++

      // accept an array of strings or objects
      if (typeof param === 'string') param = { flags: param }
      else param = Object.assign({}, param)
      if (!param.flags && param.aliases) param.flags = [].concat(param.aliases)[0]

      if (!addedToHelp) this.helpOpts.usagePositionals = (this.helpOpts.usagePositionals || []).concat(param.flags)

      // allow "commentary" things in positional dsl string via opts.ignore
      //@ts-ignore
      if (~opts.ignore.indexOf(param.flags)) return numSkipped++

      // TODO if no flags or aliases, throw error

      // convenience to define descriptions in opts
      //@ts-ignore
      if (!(param.description || param.desc) && (opts.paramsDescription || opts.paramsDesc)) {
        //@ts-ignore
        param.desc = [].concat(opts.paramsDescription || opts.paramsDesc)[index - numSkipped]
      }
      //@ts-ignore
      if (!param.group && opts.paramsGroup) param.group = opts.paramsGroup

      // don't apply command desc to positional params (via configure calls below)
      //@ts-ignore
      const optsDescription = opts.description
      //@ts-ignore
      const optsDesc = opts.desc
      //@ts-ignore
      delete opts.description
      //@ts-ignore
      delete opts.desc

      // inferPositionalProperties will generate flags/aliases for wrapped elementType needed for parsing
      const positionalFlags = param.flags
      delete param.flags

      param = Object.assign(this.utils.inferPositionalProperties(positionalFlags, Object.keys(this._factories)), param)
      //@ts-ignore
      if (!param.elementType) param.elementType = this._getType(param).configure(opts, false)

      param.flags = positionalFlags
      //@ts-ignore
      const positional = this.get('positional', param).configure(opts, false)
      //@ts-ignore
      opts.description = optsDescription
      //@ts-ignore
      opts.desc = optsDesc
      //@ts-ignore
      if (this.unknownType) this.unknownType.addPositional(positional)
      this.custom(positional)
    })

    return this
  }

  // configure any arg type
  custom<T>(type: IType<T>) {
    if (type) {
      if (typeof type.withParent === 'function') type.withParent(this.name!)
      if (typeof type.validateConfig === 'function') type.validateConfig(this.utils)
      this.types.push(type)
    }
    return this
  }
  //@ts-ignore
  _normalizeOpts(flags, opts) {
    opts = opts || {}
    if (Array.isArray(flags)) {
      opts.aliases = flags // treat an array as aliases
    } else if (typeof flags === 'string') {
      opts.flags = flags // treat a string as flags
    } else if (typeof flags === 'object') {
      opts = flags
    }
    return opts
  }
  //@ts-ignore
  _addOptionType(flags, opts, name) {
    //@ts-ignore
    this.helpOpts.usageHasOptions = true
    //@ts-ignore
    return this.custom(this._getType(flags, opts, name))
  }
  //@ts-ignore
  _getType(flags, opts, name) {
    opts = this._normalizeOpts(flags, opts)

    name = String(name || opts.type)
    if (name.indexOf(':') !== -1) {
      const types = name.split(':').filter(Boolean)
      if (types[0] === 'array') return this._getArrayType(flags, opts, types.slice(1).join(':') || 'string')
      name = types[0]
    }

    return this.get(name, opts)
  }
  //@ts-ignore
  _getArrayType(flags, opts, subtypeName) {
    opts = this._normalizeOpts(flags, opts) // TODO this may be redundant

    subtypeName = String(subtypeName || opts.type)
    if (subtypeName.indexOf(':') !== -1) {
      const types = subtypeName.split(':').filter(Boolean)
      if (types[0] === 'array') {
        opts.elementType = this._getArrayType(flags, opts, types.slice(1).join(':') || 'string')
        return this.get('array', opts)
      }
      subtypeName = types[0]
    }

    opts.elementType = this.get(subtypeName, opts)
    return this.get('array', opts)
  }

  // specify 'type' (as string) in opts
  option(flags: string, opts: TypeOptions<any>) {
    //@ts-ignore
    return this._addOptionType(flags, opts)
  }



  // TODO more types

  // lifecycle hook
  check(handler: Function) {
    //@ts-ignore
    this._checkHandler = handler
    return this
  }

  // parse and exit if there's output (e.g. help text) or a non-zero code; otherwise resolves to argv
  // useful for standard CLIs
  async parseAndExit(args: any, state: any) {
    const context = await this._parse(args, state)
    const result = context.toResult()
    if (result.output) {
      // note that we want context.helpRequestedImplicitly to output to stderr, not stdout
      const level = ((context.helpRequested || context.versionRequested) && result.code === 0) ? 'log' : 'error'
      console[level](result.output)
      process.exit(result.code)
    }
    if (result.code !== 0) process.exit(result.code)
    return result.argv
  }

  // parse and resolve to a context result (never exits)
  // useful for chatbots or checking results
  async parse(args: string[], state: any) {
    const context = await this._parse(args, state)
    return context.toResult()
  }

  async _parse(args: string[], state: unknown) {
    // init context and kick off recursive type parsing/execution
    const context = this.initContext(false, state).slurpArgs(args)

    // init unknownType in context only for the top-level (all levels share/overwrite the same argv._)
    if (this.unknownType) {
      this.unknownType.setValue(context, this.unknownType.defaultVal)
      this.unknownType.applySource(context, SOURCE_CONSTANTS.SOURCE_DEFAULT)
    }

    if (this._showHelpByDefault && !context.details.args.length) {
      // preemptively request help (to stderr)
      context.deferImplicitHelp()
    }

    try {
      await this.parseFromContext(context)

      if (!context.commandHandlerRun && !context.output) {
        this.addStrictModeErrors(context)
      }

      if ((context.helpRequested || context.helpRequestedImplicitly) && !context.output) {
        context.addDeferredHelp(this.initHelpBuffer())
      } else if (context.versionRequested && !context.output) {
        context.addDeferredVersion()
      } else if (context.messages.length && !context.output) {
        context.addDeferredHelp(this.initHelpBuffer())
      }
    } catch (err) {
      context.unexpectedError(err)
    }

    return context
  }

  // recursive, meant to be used internally
  async parseFromContext(context: Context) {
    // first complete configuration for special types
    let hasCommands = false
    let hasDefaultCommand = false
    this.types.forEach(type => {
      //@ts-ignore
      if (type.needsApi) type.configure({ api: this.newChild(type.aliases[0]) }, false)
      //@ts-ignore
      const implicit = type.implicitCommands
      //@ts-ignore
      if (implicit && implicit.length) this.unknownType.addImplicit(implicit, type)

      if (type.datatype === 'command') {
        hasCommands = true
        //@ts-ignore
        if (type.isDefault) hasDefaultCommand = true
      }
    })
    if (!this._magicCommandAdded && this._showHelpByDefault && hasCommands && !hasDefaultCommand) {
      this._magicCommandAdded = true
      //@ts-ignore
      this._internalCommand(Api.DEFAULT_COMMAND_INDICATOR, (argv, context) => {
        context.deferImplicitHelp().addDeferredHelp(this.initHelpBuffer())
        //@ts-ignore
      }).configure({ api: this.newChild(Api.DEFAULT_COMMAND_INDICATOR, { strictMode: false }) }, false)
    }

    // add known types to context
    this.applyTypes(context)
    // run async parsing for all types except unknown
    const parsePromises = this.types.map(type => type.parse(context))

    await Promise.all(parsePromises)

    // now run async parsing for unknown
    if (this.unknownType) {
      await this.unknownType.parse(context)

      // once all parsing is complete, populate argv in context (sync)
      // first add unknownType to context.argv (because it's needed to determine shouldCoerceAndCheck)
      context.populateArgv([this.unknownType.toResult(context, true)])
    }

    // next determine shouldCoerceAndCheck
    const shouldCoerceAndCheck = this.shouldCoerceAndCheck(context)
    // then populate argv with other types, letting them know if it makes sense to apply coercion
    context.populateArgv(this.types.map(type => type.toResult(context, shouldCoerceAndCheck)))

    // TODO before postParse, determine if any are promptable (and need prompting) and prompt each in series

    // run custom api-level async argv check/hook between argv population and command execution
    // it should use context.cliMessage to report errors (or can otherwise manipulate context)
    //@ts-ignore
    if (typeof this._checkHandler === 'function' && shouldCoerceAndCheck) {
      //@ts-ignore
      await this._checkHandler(context.argv, context)
    }

    // run async post-parsing
    let postParse = this.types.map(type => type.postParse(context)) // this potentially runs commands
    if (this.unknownType) postParse = postParse.concat(this.unknownType.postParse(context))
    return Promise.all(postParse)
  }

  initContext(includeTypes: boolean, state: unknown) {
    //@ts-ignore
    const context = this.get('_context', {
      //@ts-ignore
      utils: this.utils,
      pathLib: this.pathLib,
      fsLib: this.fsLib,
      state
    }) as Context
    return includeTypes ? this.applyTypes(context) : context
  }

  applyTypes(context: Context) {
    //@ts-ignore
    context.pushLevel(this.name!, this.types.map(type => {
      type.setValue(context, type.defaultVal)
      type.applySource(context, SOURCE_CONSTANTS.SOURCE_DEFAULT)
      return type.toObject()
    }))
    return context
  }

  initHelpBuffer() {
    const helpOpts = Object.assign({ utils: this.utils, usageName: this.name }, this.helpOpts) as HelpOptions
    return this.get('helpBuffer', helpOpts as any) as any
  }

  // clear as mud? this predicts the future, essentially the inverse of conditions found in parse after
  // parseFromContext and also the conditions that would make the showHelpByDefault command run
  // basically, we don't want to run the custom check handler if help text or version will be output
  shouldCoerceAndCheck(context: Context) {
    return !context.helpRequested &&
      !context.helpRequestedImplicitly &&
      !context.versionRequested &&
      !(context.messages && context.messages.length) &&
      (!this._magicCommandAdded || context.explicitCommandMatch(this.name!))
  }

  // optional convenience methods
  getHelp(opts: any) {
    //@ts-ignore
    return this.initContext(true).addHelp(this.initHelpBuffer(), opts).output
  }
}

Api.ROOT_NAME = undefined // defined by first Api instance in constructor

export default Api