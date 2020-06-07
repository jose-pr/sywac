import TypeWrapper, { TypeWrapperOptions } from './wrapper'
import { Context } from '../_api'

export interface TypePositionalOptions<T> extends TypeWrapperOptions<T> {
  acceptFlags?: boolean
  variadic?: boolean
  params?:any
}

export class TypePositional<T> extends TypeWrapper<T> {
  static get<T>(opts?: TypePositionalOptions<T>) {
    return new TypePositional(opts)
  }

  acceptFlags?: boolean
  _variadic?: boolean

  constructor(opts?: TypePositionalOptions<T>) {
    super(Object.assign({ acceptFlags: false, variadic: false }, opts || {} as TypePositionalOptions<T>))
  }

  configure(opts?: TypePositionalOptions<T>, override?: boolean) {
    opts = opts || {} as TypePositionalOptions<T>
    if (typeof override === 'undefined') override = true
    super.configure(opts, override)

    if (override || typeof this.acceptFlags === 'undefined') this.acceptFlags = 'acceptFlags' in opts ? opts.acceptFlags : this.acceptFlags
    if (override || typeof this._variadic === 'undefined') this._variadic = 'variadic' in opts ? opts.variadic : this._variadic

    return this
  }

  get isVariadic() {
    // TODO perhaps remove this._variadic and return this.datatype.startsWith('array') instead
    return this._variadic
  }

  get helpGroup() {
    return this._group || 'Arguments:'
  }

  buildHelpHints(hints: string[]) {
    this.elementType.buildHelpHints(hints)
  }

  withParent(apiName: string) {
    super.withParent(apiName)
    this.elementType.withParent(apiName)
    return this
  }

  // called by api
  validateConfig(utils: any) {
    if (this.acceptFlags) this.elementType.validateConfig(utils)
  }

  // called by api
  async parse(context: Context) {
    // only need to parse for flags
    // otherwise will be populated by unknownType
    if (this.acceptFlags) {
      // first pass of parsing checks for flags with validation disabled
      await this.elementType.parse(context, false)
      return this.resolve()
    }
    return super.resolve()
  }

  // called by unknownType
  async validateParsed(context: Context) {
    await this.elementType.validateParsed(context)
    return super.resolve()
  }

  // called by unknownType
  setValue(context: Context, value: T) {
    this.elementType.setValue(context, value)
  }

  // called by unknownType
  applySource(context: Context, source: string, position: number, raw: string) {
    this.elementType.applySource(context, source, position, raw)
  }

  toResult(context: Context, shouldCoerce: boolean) {
    return this.elementType.toResult(context, shouldCoerce)
  }
}

export default TypePositional
