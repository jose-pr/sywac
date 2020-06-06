import { Context, SlurpedArg } from "../context"
import { CoerceFunction, TypeOptions, IType, SOURCE_CONSTANTS, TypeResult, TypeObject } from "./api"


export class Type<V = any, O extends TypeOptions<V> = TypeOptions<V>> implements IType<V, O> {
  protected _aliases: string[] = []
  protected _defaultVal?: V
  protected _required?: boolean
  protected _strict?: boolean
  protected _coerceHandler?: CoerceFunction<V>
  protected _flags?: string
  protected _desc?: string
  protected _hints?: string | string[]
  protected _group?: string
  protected _hidden?: boolean
  protected _parent?: string

  constructor(opts: O) {
    this._aliases = []
    this.configure(opts, true)
  }
  configure(opts?: Partial<O>, override: boolean = true) {
    opts = opts || {} as O
    // configurable for parsing
    if (override || !this._aliases.length) this._aliases = opts.aliases ? (this._aliases || []).concat(opts.aliases as string[]) : this._aliases
    if (override || typeof this._defaultVal === 'undefined') this._defaultVal = 'defaultValue' in opts ? opts.defaultValue : this._defaultVal
    if (override || typeof this._required === 'undefined') this._required = 'required' in opts ? opts.required : this._required
    if (override || typeof this._strict === 'undefined') this._strict = 'strict' in opts ? opts.strict : this._strict
    if (override || typeof this._coerceHandler !== 'function') this._coerceHandler = opts.coerce || this._coerceHandler
    // configurable for help text
    if (override || !this._flags) this._flags = opts.flags || this._flags
    if (override || !this._desc) this._desc = opts.description || opts.desc || this._desc
    if (override || typeof this._hints === 'undefined') this._hints = 'hints' in opts ? opts.hints : this._hints
    if (override || !this._group) this._group = opts.group || this._group
    if (override || typeof this._hidden === 'undefined') this._hidden = 'hidden' in opts ? opts.hidden : this._hidden
    return this
  }

  get id() {
    return `${this.parent}|${this.datatype}|${this.aliases.join(',')}`
  }

  withParent(apiName: string) {
    this._parent = apiName
    return this
  }

  get parent() {
    return this._parent || 'node'
  }

  get datatype() {
    return 'value'
  }

  get shouldValidateDefaultValue() {
    return false
  }

  // == before parsing ==
  alias(a: string) {
    if (a) this._aliases = this._aliases.concat(a)
    return this
  }

  get aliases() {
    return this._aliases
  }

  defaultValue(dv: V) {
    this._defaultVal = dv
    return this
  }

  get defaultVal() {
    return this._defaultVal
  }

  required(r: boolean) {
    this._required = r
    return this
  }

  get isRequired() {
    return !!this._required
  }

  strict(s: boolean) {
    this._strict = s
    return this
  }

  get isStrict() {
    return !!this._strict
  }

  coerce(syncFunction: CoerceFunction<V>) {
    this._coerceHandler = syncFunction
    return this
  }

  get coerceHandler() {
    return typeof this._coerceHandler === 'function' ? this._coerceHandler : (v: any) => v as V
  }

  flags(f: string) {
    this._flags = f
    return this
  }

  get helpFlags() {
    return this._flags
  }

  description(d?: string) {
    this._desc = d
    return this
  }

  desc(d?: string) {
    return this.description(d)
  }

  get helpDesc() {
    // if this isn't a string, it can mess up buffer.js logic
    return typeof this._desc === 'string' ? this._desc : ''
  }

  hints(h?: string | string[]) {
    this._hints = h
    return this
  }

  get helpHints() {
    if (typeof this._hints !== 'undefined') return this._hints
    const hints = [] as string[]
    this.buildHelpHints(hints)
    return hints.length ? '[' + hints.join('] [') + ']' : ''
  }

  buildHelpHints(hintsArray: string[]) {
    // required
    if (this.isRequired) hintsArray.push('required')
    // datatype
    if (this.datatype) hintsArray.push(this.datatype)
    // default value
    const dv = this._defaultVal
    if (dv && (!Array.isArray(dv) || dv.length)) hintsArray.push(`default: ${dv}`)
  }

  group(g: string) {
    this._group = g
    return this
  }

  get helpGroup() {
    return this._group || 'Options:'
  }

  hidden(h: boolean) {
    this._hidden = h
    return this
  }

  get isHidden() {
    return !!this._hidden
  }

  validateConfig(utils: any) {
    // derive flags from aliases
    if (typeof this._flags !== 'string' && this._aliases.length) {
      this._flags = utils.aliasesToFlags(this._aliases)
    }
    // nornalize aliases or derive from flags
    if (this._aliases.length) {
      this._aliases = utils.normalizeAliases(this._aliases)
    } else if (typeof this._flags === 'string' && this._flags.length) {
      this._aliases = utils.flagsToAliases(this._flags)
    }
    // console.log(`aliases=${this.aliases}, flags=${this.helpFlags}`)
    // validate aliases
    if (!this._aliases.length) {
      throw new Error(`${this.constructor.name} requires aliases or flags.`)
    }
  }

  // + parse <-- async?
  // - interactivePrompt ?
  // + rawGiven
  // + keys or aliases
  // + value
  // + positions (key + values?)
  // - required
  // + helpGroup
  // + helpKeys: all flagged aliases
  // x helpPlaceholder: all value aliases
  // + helpDesc
  // + helpHints
  // typeName ?

  // resolveSlow () {
  //   let self = this
  //   let timeout = Math.floor(Math.random() * 500)
  //   console.log('resolving %s in %d ms', self.constructor.name, timeout)
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       console.log('resolve', self.constructor.name)
  //       resolve(self)
  //     }, timeout)
  //   })
  // }

  resolve() {
    // console.log('resolve', this.constructor.name)
    return Promise.resolve(this)
    // return this.resolveSlow()
  }

  // async parsing
  parse(context: Context, validate:boolean = true) {
    return this._internalParse(context, validate)
  }
  private _internalParse(context: Context, validate?: boolean) {
    // console.log('parse', this.constructor.name, this.helpFlags)
    let lastKeyMatchesAlias = false
    let previousUsedValue: any
    // iterate over each slurped arg and determine if its key-value pairs are relevant to this type/option
    context.slurped.forEach(arg => {
      // if the last key seen applies to this type, see if a keyless value applies as the value
      // e.g. --key value1 value2 => (1) k=key v=true, (2) k='' v=value1, (3) k='' v=value2
      //      does value1 apply to key? how about value2?
      if (lastKeyMatchesAlias && arg.parsed.length === 1 && !arg.parsed[0].key && this.isApplicable(context, arg.parsed[0].value, previousUsedValue, arg)) {
        previousUsedValue = arg.parsed[0].value
        this.setValue(context, previousUsedValue)
        this.applySource(context, SOURCE_CONSTANTS.SOURCE_FLAG, arg.index, arg.raw)
        arg.parsed[0].claimed = true
        return
      }

      arg.parsed.forEach((kv, kvIndex) => {
        if (!kv.key) return undefined
        const matchedAlias = this.aliases.find(alias => alias === kv.key)
        lastKeyMatchesAlias = !!matchedAlias
        if (matchedAlias) {
          this.observeAlias(context, matchedAlias)
          previousUsedValue = kv.value
          this.setValue(context, previousUsedValue)
          this.applySource(context, SOURCE_CONSTANTS.SOURCE_FLAG, arg.index, arg.raw)
          kv.claimed = true
        }
      })
    })

    return validate ? this.validateParsed(context) : this.resolve()
  }

  // async validation called from parse
  async validateParsed(context: Context) {
    if (this.isRequired && !this.hasRequiredValue(context)) {
      const msgAndArgs = { msg: '', args: [] }
      this.buildRequiredMessage(context, msgAndArgs)
      if (msgAndArgs.msg) this.failValidation(context, [msgAndArgs.msg].concat(msgAndArgs.args || []))
    }

    if (this.isStrict && (context.lookupSourceValue(this.id) !==  SOURCE_CONSTANTS.SOURCE_DEFAULT || this.shouldValidateDefaultValue)) {
      const isValid = await this.validateValue(this.getValue(context), context)
      if (!isValid) {
        const msgAndArgs = { msg: '', args: [] }
        this.buildInvalidMessage(context, msgAndArgs)
        if (msgAndArgs.msg) this.failValidation(context, [msgAndArgs.msg].concat(msgAndArgs.args || []))
      }
    }

    return this.resolve()
  }

  failValidation(context: Context, msg: string[]) {
    let args: string[]
    if (Array.isArray(msg)) {
      args = msg
    } else {
      // DO NOT PASS OR LEAK arguments!
      // see https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
      const argsLen = arguments.length
      args = new Array(argsLen - 1)
      for (let i = 1; i < argsLen; ++i) {
        args[i - 1] = arguments[i]
      }
    }
    context.cliMessage.apply(context, args)
    context.markTypeInvalid(this.id)
  }

  hasRequiredValue(context: Context) {
    return context.lookupSourceValue(this.id) !==  SOURCE_CONSTANTS.SOURCE_DEFAULT
  }

  buildRequiredMessage(context: Context, msgAndArgs: { msg: string, args: string[] }) {
    msgAndArgs.msg = 'Missing required argument: %s'
    msgAndArgs.args = [this.aliases.join(' or ')]
  }

  buildInvalidMessage(context: Context, msgAndArgs: { msg: string, args: (V | string)[] }) {
    msgAndArgs.msg = 'Value "%s" is invalid for argument %s.'
    msgAndArgs.args = [this.getValue(context), this.aliases.join(' or ')]
  }

  // async hook to execute after all parsing
  postParse(context: Context) {
    // console.log('postParse', this.constructor.name)
    return this.resolve()
  }

  applySource(context: Context, source?: string | null, position?: number, raw?: string) {
    context.employSource(this.id, source, position, raw)
    // source precedence, most to least direct (for future reference):
    // 1. prompt (interactive mode only)
    // 2. arg
    // 3. stdin
    // 4. env
    // 5. configfile
    // 6. default
  }

  isApplicable(context: Context, currentValue: unknown, previousValue: unknown, slurpedArg: SlurpedArg) {
    // assumes (1) this type should hold a single value
    // and (2) a non-string previous value was not explicit
    // e.g. previous was not --key=value
    return typeof previousValue !== 'string'
  }

  observeAlias(context: Context, alias: string) { }

  setValue(context: Context, value: V) {
    context.assignValue(this.id, value)
  }

  getValue(context: Context) {
    return context.lookupValue(this.id) as V
  }

  // subtype impls can be async (return a promise)
  validateValue(value: unknown, context: Context): Promise<boolean> | boolean {
    return true
  }

  toObject():TypeObject {
    return {
      // populated via config
      id: this.id,
      aliases: this.aliases,
      datatype: this.datatype,
      // defaultVal: this.defaultVal,
      isRequired: this.isRequired,
      helpFlags: this.helpFlags!,
      helpDesc: this.helpDesc,
      helpHints: this.helpHints as string[],
      helpGroup: this.helpGroup,
      isHidden: this.isHidden
    }
  }

  toResult(context: Context, shouldCoerce?: boolean): TypeResult {
    const obj = context.lookupSource(this.id)
    return {
      // populated via config
      parent: this.parent,
      aliases: this.aliases,
      datatype: this.datatype,
      // defaultVal: this.defaultVal,
      // helpFlags: this.helpFlags,
      // helpDesc: this.helpDesc,
      // helpHints: this.helpHints,
      // helpGroup: this.helpGroup,
      // populated via parse
      value: shouldCoerce ? this.coerceHandler(this.getValue(context)) : this.getValue(context),
      source: obj && obj.source,
      position: obj && obj.position,
      raw: obj && obj.raw
    }
  }
}

export default Type
