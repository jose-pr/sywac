import Type  from './type'
import { TypeOptions } from '../_api'

export interface TypeWrapperOptions<T> extends TypeOptions<T> {
  elementType?: Type<T>
  of?:Type<T>
}

export class TypeWrapper<T> extends Type<T> {
  private _elementType!: Type<T>
  configure(opts?: TypeWrapperOptions<T>, override?: boolean) {
    opts = opts || {} as TypeWrapperOptions<T>
    if (typeof override === 'undefined') override = true
    super.configure(opts, override)

    if (override || !this._elementType) this._elementType = opts.elementType || opts.of || this._elementType

    return this
  }

  of(subtype:Type<T>) {
    this._elementType = subtype
    return this
  }

  get elementType() {
    if (!this._elementType) this._elementType = require('./string').get()
    return this._elementType
  }

  get datatype() {
    return this.elementType.datatype
  }

  get shouldValidateDefaultValue() {
    return this.elementType.shouldValidateDefaultValue
  }
}

export default TypeWrapper
