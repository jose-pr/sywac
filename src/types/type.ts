import { Context, SlurpedArg } from "../context"

export type CoerceFunction<T> = (v:any)=>T
export interface TypeOptions<T> {

  aliases?: string[]|string
  defaultValue?: T
  /**
   * @default false
   */
  required?: boolean
  /**
   * @default false
   */
  strict?: boolean
  coerce?: CoerceFunction<T>
  /**
   * Defines the flags used in help text and aliases to expect when parsing.
   * 
     For example,`-n, --num <number>` would allow -n or --num to be given when parsing.
   */
  flags?: string
  /**
   * The desc (or description) property controls the text displayed immediately to the right of the option or argument in the generated help text.
   If not specified, the description will be blank.
  ```ts
  sywac.boolean('--confirm', {
  desc: 'skip confirmation prompt'
  });
  ```
  ```console
  Options:
  --confirm  skip confirmation prompt                                  [boolean]
  ```
  See also the {@link TypeOptions.hints} property.
   */
  description?: string
  /**
   * Alias for description
   * 
   * See also the {@link TypeOptions.description} property*/
  desc?: string
  /**
   * 
   The hints property controls the type information displayed to the far right of the option or argument in the generated help text.

    By default, a hint will be generated automatically based on the type of the option - for example, [boolean] or [number].

    You can use this to display an optional option as if it was required, or to make the hint more specific.
    ```ts
    sywac.string('--name <name>', {
      hints: '[required] [string]'
    });
    sywac.array('--users', {
      hints: '[list of users]'
    });
    ```
    ```console
    Options:
      --name                                               [required] [string]
      --users                                                        [list of users]
    ```
    You can also use this property to suppress an unwanted auto-generated hint.
    ```ts
    sywac.command({
      aliases: 'update <student-id>',
      desc: 'update a student record',
      hints: ''                       // suppress usual aliases hint
    });
    ```
    ```console
    Commands:
      update    update a student record
    See also the {@link TypeOptions.description} property.
    ```
   */
  hints: string[]
  /**
   * The group option allows you to organize options into multiple sections in the generated help text. By default, commands are grouped under the section Commands:, positional arguments are grouped under the section Arguments:, and flagged options are grouped under Options:.

  Tip:

  The text you specify will be used verbatim, so be sure to include the ending colon (:)
  within your label if you want the colon in your section header.
  ```js
  sywac.number('-p, --port <port>', {
  desc: 'port to listen on',
  group: 'Server Options:'
  });
  ```
  ```console
  Server Options:
  -p, --port   port to listen on                                  [number]
  ```
   */
  group: string
  /**
   * The hidden option allows you to specify that an option or argument should not be included
     in the generated help text.

      You can use this to hide a rarely-used or deprecated option, while still taking advantage
      of sywac’s parsing.
      ```ts
      sywac.boolean('--fancy', {
        hidden: true
      });
      ```
      You can also use it to slurp up extra positional arguments, without being displayed in the arguments section.
      ```ts
      sywac.positional('[users...]', {
        hidden: true
      });
      ```
   */
  hidden: boolean
}
export class Type<T> {
  static get SOURCE_DEFAULT() {
    return 'default'
  }

  static get SOURCE_FLAG() {
    return 'flag'
  }

  static get SOURCE_POSITIONAL() {
    return 'positional'
  }

  private _aliases:string[]
  private _defaultVal?:T
  private _required?:boolean
  private _strict?:boolean
  private _coerceHandler?:CoerceFunction<T>
  private _flags?:string
  private _desc?:string
  private _hints?:string|string[]
  private _group?:string
  private _hidden?:boolean
  private _parent?:string

  constructor(opts?:TypeOptions<T>) {
    this._aliases = []
    this.configure(opts, true)
  }

  configure(opts?:TypeOptions<T>, override?:boolean) {
    opts = opts || {} as TypeOptions<T>
    if (typeof override === 'undefined') override = true
    // configurable for parsing
    if (override || !this._aliases.length) this._aliases = opts.aliases ? (this._aliases || []).concat(opts.aliases) : this._aliases
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

  /**A string uniquely identifying this type across all levels
  used for mapping values and sources in context*/
  get id() {
    return `${this.parent}|${this.datatype}|${this.aliases.join(',')}`
  }

  withParent(apiName:string) {
    this._parent = apiName
    return this
  }

  get parent() {
    return this._parent || 'node'
  }

  /**subtypes should override this!*/
  get datatype() {
    return 'value'
  }

  get shouldValidateDefaultValue() {
    return false
  }

  // == before parsing ==
  alias(a:string) {
    if (a) this._aliases = this._aliases.concat(a)
    return this
  }

  get aliases() {
    return this._aliases
  }

  defaultValue(dv:T) {
    this._defaultVal = dv
    return this
  }

  get defaultVal() {
    return this._defaultVal
  }

  required(r:boolean) {
    this._required = r
    return this
  }

  get isRequired() {
    return !!this._required
  }

  strict(s:boolean) {
    this._strict = s
    return this
  }

  get isStrict() {
    return !!this._strict
  }

  coerce(syncFunction:CoerceFunction<T>) {
    this._coerceHandler = syncFunction
    return this
  }

  get coerceHandler() {
    return typeof this._coerceHandler === 'function' ? this._coerceHandler : (v:any) => v as T
  }

  flags(f:string) {
    this._flags = f
    return this
  }

  get helpFlags() {
    return this._flags
  }

  description(d?:string) {
    this._desc = d
    return this
  }

  desc(d?:string) {
    return this.description(d)
  }

  get helpDesc() {
    // if this isn't a string, it can mess up buffer.js logic
    return typeof this._desc === 'string' ? this._desc : ''
  }

  hints(h?:string|string[]) {
    this._hints = h
    return this
  }

  get helpHints() {
    if (typeof this._hints !== 'undefined') return this._hints
    const hints = [] as string[]
    this.buildHelpHints(hints)
    return hints.length ? '[' + hints.join('] [') + ']' : ''
  }

  buildHelpHints(hintsArray:string[]) {
    // required
    if (this.isRequired) hintsArray.push('required')
    // datatype
    if (this.datatype) hintsArray.push(this.datatype)
    // default value
    const dv = this._defaultVal
    if (dv && (!Array.isArray(dv) || dv.length)) hintsArray.push(`default: ${dv}`)
  }

  group(g:string) {
    this._group = g
    return this
  }

  get helpGroup() {
    return this._group || 'Options:'
  }

  hidden(h:boolean) {
    this._hidden = h
    return this
  }

  get isHidden() {
    return !!this._hidden
  }

  validateConfig(utils:any) {
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
  parse(context:Context) {
    return this._internalParse(context, true)
  }
  _internalParse(context:Context, validate?:boolean) {
    // console.log('parse', this.constructor.name, this.helpFlags)
    let lastKeyMatchesAlias = false
    let previousUsedValue:any
    // iterate over each slurped arg and determine if its key-value pairs are relevant to this type/option
    context.slurped.forEach(arg => {
      // if the last key seen applies to this type, see if a keyless value applies as the value
      // e.g. --key value1 value2 => (1) k=key v=true, (2) k='' v=value1, (3) k='' v=value2
      //      does value1 apply to key? how about value2?
      if (lastKeyMatchesAlias && arg.parsed.length === 1 && !arg.parsed[0].key && this.isApplicable(context, arg.parsed[0].value, previousUsedValue, arg)) {
        previousUsedValue = arg.parsed[0].value
        this.setValue(context, previousUsedValue)
        this.applySource(context, Type.SOURCE_FLAG, arg.index, arg.raw)
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
          this.applySource(context, Type.SOURCE_FLAG, arg.index, arg.raw)
          kv.claimed = true
        }
      })
    })

    return validate ? this.validateParsed(context) : this.resolve()
  }

  // async validation called from parse
  async validateParsed(context:Context) {
    if (this.isRequired && !this.hasRequiredValue(context)) {
      const msgAndArgs = { msg: '', args: [] }
      this.buildRequiredMessage(context, msgAndArgs)
      if (msgAndArgs.msg) this.failValidation(context, [msgAndArgs.msg].concat(msgAndArgs.args || []))
    }

    if (this.isStrict && (context.lookupSourceValue(this.id) !== Type.SOURCE_DEFAULT || this.shouldValidateDefaultValue)) {
      const isValid = await this.validateValue(this.getValue(context), context)
      if (!isValid) {
        const msgAndArgs = { msg: '', args: [] }
        this.buildInvalidMessage(context, msgAndArgs)
        if (msgAndArgs.msg) this.failValidation(context, [msgAndArgs.msg].concat(msgAndArgs.args || []))
      }
    }

    return this.resolve()
  }

  failValidation(context:Context, msg:string[]) {
    let args:string[]
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

  hasRequiredValue(context:Context) {
    return context.lookupSourceValue(this.id) !== Type.SOURCE_DEFAULT
  }

  buildRequiredMessage(context:Context, msgAndArgs:{msg:string,args:string[]}) {
    msgAndArgs.msg = 'Missing required argument: %s'
    msgAndArgs.args = [this.aliases.join(' or ')]
  }

  buildInvalidMessage(context:Context, msgAndArgs:{msg:string,args:string[]}) {
    msgAndArgs.msg = 'Value "%s" is invalid for argument %s.'
    msgAndArgs.args = [this.getValue(context) as string, this.aliases.join(' or ')]
  }

  // async hook to execute after all parsing
  postParse(context:Context) {
    // console.log('postParse', this.constructor.name)
    return this.resolve()
  }

  applySource(context:Context, source:string, position:number, raw:string) {
    context.employSource(this.id, source, position, raw)
    // source precedence, most to least direct (for future reference):
    // 1. prompt (interactive mode only)
    // 2. arg
    // 3. stdin
    // 4. env
    // 5. configfile
    // 6. default
  }

  isApplicable(context:Context, currentValue:unknown, previousValue:unknown, slurpedArg:SlurpedArg) {
    // assumes (1) this type should hold a single value
    // and (2) a non-string previous value was not explicit
    // e.g. previous was not --key=value
    return typeof previousValue !== 'string'
  }

  observeAlias(context:Context, alias:string) { }

  setValue(context:Context, value:T) {
    context.assignValue(this.id, value)
  }

  getValue(context:Context) {
    return context.lookupValue(this.id)
  }

  // subtype impls can be async (return a promise)
  validateValue(value:unknown, context:Context) {
    return true
  }

  toObject() {
    return {
      // populated via config
      id: this.id,
      aliases: this.aliases,
      datatype: this.datatype,
      // defaultVal: this.defaultVal,
      isRequired: this.isRequired,
      helpFlags: this.helpFlags,
      helpDesc: this.helpDesc,
      helpHints: this.helpHints,
      helpGroup: this.helpGroup,
      isHidden: this.isHidden
    }
  }

  toResult(context:Context, shouldCoerce:boolean) {
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
