import Type from "./type"
import TypeWrapper, { TypeWrapperOptions } from "./wrapper"
import { Context, SlurpedArg } from "../context"
const SOURCE_DEFAULT = Type.SOURCE_DEFAULT

export interface TypeArrayOptions<T> extends TypeWrapperOptions<T[]> {
  delimiter?: string
  delim?: string
  cumulative?: boolean
}

export class TypeArray<T> extends TypeWrapper<T[]> {
  static get<T>(opts?: TypeArrayOptions<T>) {
    return new TypeArray(opts)
  }
  private _delim?: string
  private _cumulative?: boolean
  constructor(opts?: TypeArrayOptions<T>) {
    super(Object.assign({ delim: ',', cumulative: true }, opts || {} as TypeArrayOptions<T>))
  }

  configure(opts?: TypeArrayOptions<T>, override?: boolean) {
    opts = opts || {} as TypeArrayOptions<T>
    if (typeof override === 'undefined') override = true
    super.configure(opts, override)

    if (override || typeof this._delim === 'undefined') {
      if ('delimiter' in opts) this._delim = opts.delimiter
      else if ('delim' in opts) this._delim = opts.delim
    }

    if (override || typeof this._cumulative === 'undefined') this._cumulative = 'cumulative' in opts ? opts.cumulative : this._cumulative

    return this
  }

  delimiter(d: string) {
    this._delim = d
    return this
  }

  get delim() {
    return this._delim
  }

  cumulative(c: boolean) {
    this._cumulative = c
    return this
  }

  get defaultVal() {
    const dv = super.defaultVal
    return dv ? ([] as T[]).concat(dv) : [] // DO NOT LET getValue AND defaultVal REFERENCE THE SAME ARRAY OBJECT!
  }

  get datatype() {
    const subtype = this.elementType.datatype
    return 'array' + (subtype ? `:${subtype}` : '')
  }

  buildHelpHints(hints: string[]) {
    this.elementType.buildHelpHints(hints)
    const datatypeIndex = hints.findIndex(h => h === this.elementType.datatype)
    if (datatypeIndex !== -1) hints[datatypeIndex] = this.datatype
  }

  isApplicable(context: Context, currentValue: unknown, previousValue: unknown, slurpedArg: SlurpedArg) {
    // remove last element if previous value was not explicit
    const v = context.lookupValue(this.id) as T[]
    if (v && v.length && typeof previousValue !== 'string') v.pop()
    this.elementType.isApplicable(context, currentValue, previousValue, slurpedArg)
    return true // TODO this is greedy (`--key=one two` includes `one` and `two`), make this configurable
  }

  observeAlias(context: Context, alias: string) {
    if (!this._cumulative) context.assignValue(this.id, [])
    this.elementType.observeAlias(context, alias)
  }

  setValue(context: Context, value: unknown) {
    // if current source is 'default', then we're now setting a non-default value
    // so append to a fresh array instead of the default one
    // note that this assumes setValue is called before applySource in api.applyTypes
    if (context.lookupSourceValue(this.id) === SOURCE_DEFAULT) context.assignValue(this.id, [])

    if (Array.isArray(value)) {
      const v = context.lookupValue(this.id) as T[]
      context.assignValue(this.id, (v || []).concat(value))
      return
    }
    if (value && this.delim && typeof value === 'string') {
      value.split(this.delim).forEach(v => this.addValue(context, v))
      return
    }
    this.addValue(context, value)
  }

  addValue(context: Context, value: unknown) {
    this.elementType.setValue(context, value as any)
    let v = context.lookupValue(this.id) as T[]
    if (!v) {
      v = []
      context.assignValue(this.id, v)
    }
    const elementValue = this.elementType.getValue(context)
    if (Array.isArray(elementValue) && v.length && v[v.length - 1] === elementValue as any) {
      return // we already have elementValue, it's just been modified
    }
    v.push(elementValue as any)
  }

  get isStrict() {
    return super.isStrict || this.elementType.isStrict
  }

  async validateValue(value: any, context: Context) {
    const validArray = await Promise.all((value as any || []).map((v: any) => this.elementType.validateValue(v, context)))
    return (validArray || []).filter(isValid => !isValid).length === 0
  }

  buildInvalidMessage(context: Context, msgAndArgs: any) {
    super.buildInvalidMessage(context, msgAndArgs)
    const sub = {} as any
    this.elementType.buildInvalidMessage(context, sub)
    if (sub.msg) msgAndArgs.msg = sub.msg
    if (sub.args.length > msgAndArgs.args.length) msgAndArgs.args = msgAndArgs.args.concat(sub.args.slice(msgAndArgs.args.length))
  }
}

export default TypeArray
