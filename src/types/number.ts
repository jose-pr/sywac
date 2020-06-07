import Type from "./type"
import { TypeOptions, Context } from "../_api"

export interface TypeNumberOptions extends TypeOptions<number> {}

class TypeNumber extends Type<number> {
  static isNumber(value: string | number): value is number {
    return typeof value === 'number' || /^0x[0-9a-f]+$/i.test(value) || /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(value)
  }

  static get(opts:TypeOptions<number>) {
    return new TypeNumber(opts)
  }

  get datatype() {
    return 'number'
  }

  getValue(context:Context) {
    const v = context.lookupValue<string>(this.id) 
    if (typeof v === 'undefined' || v === null) return v
    return TypeNumber.isNumber(v) ? Number(v) : NaN
  }

  setValue(context:Context, value:number) {
    context.assignValue(this.id, typeof value === 'boolean' ? NaN : value)
  }

  // this is only checked if isStrict
  validateValue(value:string|number) {
    return TypeNumber.isNumber(value) && !isNaN(value)
  }

  buildInvalidMessage(context:Context, msgAndArgs:{msg:string,args:(number|string)[]}) {
    super.buildInvalidMessage(context, msgAndArgs)
    msgAndArgs.msg += ' Please specify a number.'
  }
}

export default TypeNumber
