import Type, { TypeOptions } from "./type"
import { Context, SlurpedArg } from "../context"

class TypeBoolean extends Type<boolean> {
  static get (opts:TypeOptions<boolean>) {
    return new TypeBoolean(opts)
  }

  constructor (opts:TypeOptions<boolean>) {
    super(Object.assign({ defaultValue: false }, opts))
  }

  get datatype () {
    return 'boolean'
  }

  isApplicable (context:Context, currentValue:unknown, previousValue:unknown, slurpedArg:SlurpedArg) {
    return typeof currentValue === 'boolean' || currentValue === 'true' || currentValue === 'false'
  }

  setValue (context:Context, value:boolean) {
    context.assignValue(this.id, typeof value === 'boolean' ? value : value === 'true')
  }
}

export default TypeBoolean