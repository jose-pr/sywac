import TypeString, { TypeStringOptions } from './string'
import { Context } from '../context'

export interface TypeEnumOptions extends TypeStringOptions {
  /**
   * @default true
   */
  strict?: boolean
  /**
   * @default true
   */
  caseInsensitive?: boolean
  choices?:string[]
}

class TypeEnum extends TypeString {
  static get(opts?: TypeEnumOptions) {
    return new TypeEnum(opts)
  }

  private _choices?:string[]
  private _caseInsensitive?:boolean

  constructor(opts?: TypeEnumOptions) {
    super(Object.assign({ strict: true, caseInsensitive: true }, opts))
  }

  configure(opts?:TypeEnumOptions, override?:boolean) {
    opts = opts || {} as TypeEnumOptions
    if (typeof override === 'undefined') override = true
    super.configure(opts, override)

    if (override || !this._choices!.length) this._choices = opts.choices ? (this._choices || []).concat(opts.choices) : this._choices
    if (override || typeof this._caseInsensitive === 'undefined') this._caseInsensitive = 'caseInsensitive' in opts ? opts.caseInsensitive : this._caseInsensitive

    return this
  }

  get datatype() {
    return 'enum'
  }

  choice(c:string) {
    if (c) this._choices = (this._choices || []).concat(c)
    return this
  }

  get choices() {
    return this._choices || []
  }

  buildHelpHints(hints:string[]) {
    super.buildHelpHints(hints)
    // if (this.choices.length) hints.push('choices: ' + this.choices.join(', '))
    // if (this.choices.length) hints.push('one of: ' + this.choices.join(', '))
    if (this.choices.length) hints.push(this.choices.join(', '))
  }

  validateValue(value:unknown) {
    if (!this.choices.length) return true
    value = value && (this._caseInsensitive ? String(value).toLocaleUpperCase() : value)
    return this.choices.some(c => {
      c = this._caseInsensitive ? String(c).toLocaleUpperCase() : String(c)
      return c === value
    })
  }

  buildInvalidMessage(context:Context, msgAndArgs:any) {
    super.buildInvalidMessage(context, msgAndArgs)
    if (this.choices.length) {
      msgAndArgs.msg += ' Choices are: %s'
      msgAndArgs.args.push(this.choices.join(', '))
    }
  }
}

module.exports = TypeEnum
