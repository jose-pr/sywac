import Type from "./type"
import { TypeOptions, Context, SlurpedArg, FlagTypeConfig, Sywac, TypeOptionsAliases, TypeIsRequired, ArgvExtension } from "../api"
import { ValidTypeConfig } from "./api"

export interface TypeBooleanOption extends TypeOptions<boolean> {

}

class TypeBoolean extends Type<boolean, TypeBooleanOption> {
  static get(opts: TypeBooleanOption) {
    return new TypeBoolean(opts)
  }

  constructor(opts: TypeBooleanOption) {
    super(Object.assign({ defaultValue: false }, opts))
  }

  get datatype(): 'boolean' {
    return 'boolean'
  }

  isApplicable(context: Context, currentValue: unknown) {
    return typeof currentValue === 'boolean' || currentValue === 'true' || currentValue === 'false'
  }

  setValue(context: Context, value: boolean) {
    context.assignValue(this.id, typeof value === 'boolean' ? value : value === 'true')
  }
}

export default TypeBoolean

