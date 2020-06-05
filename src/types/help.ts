import TypeImplicitCommand from "./implicit"
import { TypeOptions } from "./type"
import { Context } from "../context"

interface HelpBufferOptions {
  includePreface?: boolean
  includeUsage?: boolean
  includeGroups?: boolean
  includeExamples?: boolean
  includeEpilogue?: boolean
}
export interface TypeHelpOptions extends HelpBufferOptions, TypeOptions<boolean> {}

class TypeHelp extends TypeImplicitCommand {
  static get(opts?: TypeHelpOptions) {
    return new TypeHelp(opts)
  }
  private _bufferOpts?: HelpBufferOptions

  constructor(opts?: TypeHelpOptions) {
    super(Object.assign({ desc: 'Show help' }, opts))
  }

  configure(opts?: TypeHelpOptions, override?: boolean) {
    opts = opts || {} as TypeHelpOptions
    if (typeof override === 'undefined') override = true
    super.configure(opts, override)

    if (override || !this._bufferOpts) this._bufferOpts = this._assignBufferOpts(this._bufferOpts || {}, opts)

    return this
  }

  _assignBufferOpts(target:HelpBufferOptions, source:TypeHelpOptions) {
    (['includePreface', 'includeUsage', 'includeGroups', 'includeExamples', 'includeEpilogue'] as (keyof HelpBufferOptions)[]).forEach(opt => {
      if (opt in source) target[opt] = source[opt]
    })
    return target
  }

  get bufferOpts() {
    return this._bufferOpts || {}
  }

  validateConfig(utils:any) {
    if (!this._flags && !this._aliases.length) this._aliases.push('help')
    super.validateConfig(utils)
  }

  validateParsed(context:Context) {
    if (this.getValue(context)) this.requestHelp(context) // must call this before postParse in case of commands
    return this.resolve()
  }

  implicitCommandFound(context:Context, source:string, position:number, raw:string) {
    super.implicitCommandFound(context, source, position, raw)
    this.requestHelp(context) // must call this before postParse in case of commands
  }

  requestHelp(context:Context) {
    context.deferHelp(this.bufferOpts)
  }
}

export default TypeHelp
