import Type from "./type"
import { Context, SlurpedArg } from "../context"
import { TypeOptions } from "./api"

class TypeBoolean extends Type<boolean> {
  static get(opts: TypeOptions<boolean>) {
    return new TypeBoolean(opts)
  }

  constructor(opts: TypeOptions<boolean>) {
    super(Object.assign({ defaultValue: false }, opts))
  }

  get datatype() {
    return 'boolean'
  }

  isApplicable(context: Context, currentValue: unknown, previousValue: unknown, slurpedArg: SlurpedArg) {
    return typeof currentValue === 'boolean' || currentValue === 'true' || currentValue === 'false'
  }

  setValue(context: Context, value: boolean) {
    context.assignValue(this.id, typeof value === 'boolean' ? value : value === 'true')
  }
}

declare module '../api' {
  interface Api {
    // common individual value types
    /**
     *  Add a boolean option
     * @param flags 
     * @param opts 
     */
    boolean(flags: string, opts: TypeOptions<boolean>): Api
  }
}

export default TypeBoolean