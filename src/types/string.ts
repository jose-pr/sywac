import Type, { TypeOptions } from "./type"
import { Context } from "../context"

export interface TypeStringOptions extends TypeOptions<string>{

}

class TypeString extends Type<string> {
  static get(opts?: TypeStringOptions) {
    return new TypeString(opts)
  }

  get datatype() {
    return 'string'
  }

  getValue(context: Context) {
    const v = context.lookupValue(this.id) as string
    if (typeof v === 'undefined' || v === null) return v
    return String(v)
  }

  setValue(context: Context, value: string) {
    context.assignValue(this.id, typeof value === 'boolean' ? '' : value)
  }

  hasRequiredValue(context: Context) {
    return (super.hasRequiredValue(context) && this.getValue(context)) as boolean
  }
}

export default TypeString