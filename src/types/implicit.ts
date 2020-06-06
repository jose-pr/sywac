import TypeBoolean from './boolean'
import { Context } from '../context'
import { TypeOptions } from './api'

export interface TypeImplicitCommandOptions extends TypeOptions<boolean> {
  implicitCommand?: boolean
}

class TypeImplicitCommand extends TypeBoolean {
  private _implicitCommand?: boolean
  constructor(opts?: TypeImplicitCommandOptions) {
    super(Object.assign({ implicitCommand: true }, opts))
  }

  configure(opts?: TypeImplicitCommandOptions, override?: boolean) {
    opts = opts || {} as TypeImplicitCommandOptions
    if (typeof override === 'undefined') override = true
    super.configure(opts, override)

    if (override || typeof this._implicitCommand === 'undefined') {
      this._implicitCommand = 'implicitCommand' in opts ? opts.implicitCommand : this._implicitCommand
    }

    return this
  }

  get implicitCommands() {
    if (!this._implicitCommand) return []
    return this.aliases.filter(alias => alias.length > 1)
  }

  buildHelpHints(hints: string[]) {
    const commands = this.implicitCommands
    if (commands.length) hints.push('commands: ' + commands.join(', '))
    super.buildHelpHints(hints)
  }

  implicitCommandFound(context: Context, source: string, position: number, raw: string) {
    this.setValue(context, true)
    this.applySource(context, source, position, raw)
  }
}

export default TypeImplicitCommand