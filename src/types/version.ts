import TypeImplicitCommand, { TypeImplicitCommandOptions } from './implicit'
import { Context } from '../_api'

export interface TypeVersionOptions extends TypeImplicitCommandOptions {
  version?: string
}

class TypeVersion extends TypeImplicitCommand {
  static get(opts: TypeVersionOptions) {
    return new TypeVersion(opts)
  }

  private _versionOpts?: TypeImplicitCommandOptions

  constructor(opts?: TypeVersionOptions) {
    super(Object.assign({ desc: 'Show version number' }, opts))
  }

  configure(opts?: TypeVersionOptions, override?: boolean) {
    opts = opts || {} as TypeVersionOptions
    if (typeof override === 'undefined') override = true
    super.configure(opts, override)

    if (override || !this._versionOpts) this._versionOpts = this._assignVersionOpts(this._versionOpts || {} as TypeVersionOptions, opts)

    return this
  }

  _assignVersionOpts(target: TypeVersionOptions, source: TypeVersionOptions) {
    (['version'] as (keyof TypeVersionOptions)[]).forEach(opt => {
      if (opt in source) (target[opt] as TypeVersionOptions[typeof opt]) = source[opt] as any
    })
    return target
  }

  get versionOpts(): TypeVersionOptions {
    return this._versionOpts || {} as TypeVersionOptions
  }

  validateConfig(utils: any) {
    if (!this._flags && !this._aliases.length) this._aliases.push('version')
    super.validateConfig(utils)
  }

  validateParsed(context: Context) {
    if (this.getValue(context)) this.requestVersion(context) // must call this before postParse in case of commands
    return this.resolve()
  }

  implicitCommandFound(context: Context, source: string, position: number, raw: string) {
    super.implicitCommandFound(context, source, position, raw)
    this.requestVersion(context) // must call this before postParse in case of commands
  }

  requestVersion(context: Context) {
    context.deferVersion(this.versionOpts)
  }
}

export default TypeVersion
