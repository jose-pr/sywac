import path from "path"
import fs from "fs"

const format = require('util').format

export interface ContextOptions {
  utils?: unknown
  pathLib?: typeof path
  fsLib?: typeof fs
  state?: unknown
}
export interface ParsedArg {
  key: string,
  value: unknown,
  claimed?: boolean,
  last?: boolean,
}
export interface SlurpedArg {
  raw: string,
  index: number,
  parsed: ParsedArg[]
}
export type DeferVersion = { version?: string | Function }
export type HelBuffer = {
  groups: Record<string, TypeObject[]>
  _usageName: string
  toString(o: {}): string
  messages:string[]
}
export type Source = { source: string, position: number[], raw: string[] }
export interface TypeObject {
  id: string,
  aliases: string[],
  datatype: string,
  isRequired: boolean,
  helpFlags: string,
  helpDesc: string,
  helpHints: string,
  helpGroup: string,
  isHidden: boolean
  invalid?: boolean
  parent?: string
  value?: unknown
  source?:string
  position?:number[]
  raw?:string[]
}
export class Context {
  static get(opts?: ContextOptions) {
    return new Context(opts)
  }

  private _utils: any
  private _pathLib?: typeof path
  private _fsLib?: typeof fs
  private state: unknown
  types: Record<string, undefined | TypeObject[]>
  args: string[]
  slurped: SlurpedArg[]
  values: Map<string, unknown>
  sources: Map<string, Source>
  code: number
  output: string
  argv: { _?: string[] } & Record<string, unknown>
  knownArgv: Record<string, unknown>
  details: { args: string[], types: TypeObject[] }
  errors: (string | undefined | Error)[]
  messages: string[]
  commandHandlerRun: boolean
  helpRequested: {}
  helpRequestedImplicitly: boolean
  versionRequested: DeferVersion | false

  constructor(opts?: ContextOptions) {
    opts = opts || {}
    // dependencies
    this._utils = opts.utils
    this._pathLib = opts.pathLib
    this._fsLib = opts.fsLib
    // config
    this.state = opts.state
    this.types = {}
    // args to parse per type
    this.args = []
    this.slurped = []
    // values by type, keyed by type.id
    this.values = new Map()
    this.sources = new Map()
    // results of parsing and validation
    this.code = 0
    this.output = ''
    this.argv = {}
    this.knownArgv = {}
    this.details = { args: [], types: [] }
    this.errors = []
    this.messages = []
    // other
    this.commandHandlerRun = false
    this.helpRequested = false
    this.helpRequestedImplicitly = false
    this.versionRequested = false
  }

  get utils() {
    if (!this._utils) this._utils = require('./lib/utils').get()
    return this._utils
  }

  get pathLib() {
    if (!this._pathLib) this._pathLib = require('path')
    return this._pathLib
  }

  get fsLib() {
    if (!this._fsLib) this._fsLib = require('fs')
    return this._fsLib
  }

  slurpArgs(args: string | string[]) {
    if (typeof args === 'string') args = this.utils.stringToArgs(args)
    if (!args) args = process.argv.slice(2)
    if (!Array.isArray(args)) args = ([] as string[]).concat(args)
    // TODO read from stdin with no args? based on config?
    const parseable: string[] = []
    const extra: string[] = []
    let isExtra = false
    for (let i = 0, len = args.length, arg; i < len; i++) {
      arg = String(args[i])
      if (arg === '--') {
        isExtra = true
        // continue
      }
      (isExtra ? extra : parseable).push(arg)
    }
    this.args = parseable
    this.details.args = parseable.concat(extra)

    // let prev = [{}]
    // this.argv = this.args.reduce((argv, arg) => {
    //   let kvArray = this.parseSingleArg(arg)
    //   kvArray.forEach(kv => {
    //     if (kv.key) argv[kv.key] = kv.value
    //     else argv._.push(kv.value)
    //   })
    //   if (!kvArray[kvArray.length - 1].key && prev[prev.length - 1].key) {
    //     argv[prev[prev.length - 1].key] = kvArray[kvArray.length - 1].value
    //     argv._ = argv._.slice(0, -1)
    //   }
    //   prev = kvArray
    //   return argv
    // }, { _: [] })
    // console.log('context.js > argv:', this.argv)

    this.slurped = this.args.map((arg, index) => {
      return {
        raw: arg,
        index,
        parsed: this.parseSingleArg(arg)
      }
    })
    // console.log('context.js > slurped:', JSON.stringify(this.slurped, null, 2))

    return this
  }

  parseSingleArg(arg: string) {
    // short-circuit if no flag
    const numBeginningDashes = (arg.match(/^-+/) || [''])[0].length
    if (numBeginningDashes === 0) {
      return [{
        key: '',
        value: arg
      }]
    }
    // otherwise check for =value somewhere in arg
    const kvDelimIndex = arg.indexOf('=')
    const flags = kvDelimIndex > 1 ? arg.substring(numBeginningDashes, kvDelimIndex) : arg.slice(numBeginningDashes)
    const value = kvDelimIndex > 1 ? arg.substring(kvDelimIndex + 1) : undefined
    // allow an arg of just dashes e.g. '-'
    if (!flags && !value) {
      return [{
        key: '',
        value: arg
      }]
    }
    // can only be one flag with more than 1 dash
    if (numBeginningDashes > 1) {
      return [{
        key: flags,
        value: value || true
      }]
    }
    // may be multiple single-length flags, with value belonging to the last one
    const kvArray = flags.split('').map(flag => {
      return {
        key: flag,
        value: true as string | boolean
      }
    })
    if (value) kvArray[kvArray.length - 1].value = value
    return kvArray
  }

  pushLevel(level: string, types: TypeObject[]) {
    this.types[level] = types
    return this
  }

  unexpectedError(err?: Error | string) {
    this.errors.push(err)
    this.output = String((err && (err as Error).stack) || err)
    this.code++
  }

  cliMessage(...msg: string[]) {
    // do NOT modify this.code here - the messages will be disregarded if help is requested
    const argsLen = arguments.length
    const args = new Array((argsLen || 1) - 1)
    for (let i = 0; i < argsLen; ++i) {
      args[i] = arguments[i]
      // if any args are an array, join into string
      // this is a hack to get Node 12's util.format working like Node 10's
      // e.g. require('util').format("Value \"%s\" is invalid.", ["web", "docs"])
      // Node 10: Value "web,docs" is invalid.
      // Node 12: Value "[ 'web', 'docs' ]" is invalid.
      if (Array.isArray(args[i])) {
        args[i] = args[i].join(',')
      }
    }
    this.messages.push(format.apply(null, args))
  }

  markTypeInvalid(id: string) {
    const mappedLevels = Object.keys(this.types)
    for (let i = mappedLevels.length - 1, currentLevel, found; i >= 0; i--) {
      currentLevel = mappedLevels[i]
      found = (this.types[currentLevel] || []).find(type => type.id === id)
      if (found) {
        found.invalid = true
        return
      }
    }
  }

  explicitCommandMatch(level: string) {
    if (!this.argv._ || !this.argv._.length) return false
    const candidate = this.argv._[0]
    return (this.types[level] || []).some(type => type.datatype === 'command' && type.aliases.some(alias => alias === candidate))
  }

  matchCommand(level: string, aliases: string[], isDefault: boolean) {
    if (!this.argv._ || this.versionRequested) return false // TODO what to do without an unknownType?
    // first determine if argv._ starts with ANY known command alias
    const matchFound = this.explicitCommandMatch(level)
    const candidate = this.argv._[0]
    return {
      explicit: matchFound && aliases.some(alias => alias === candidate),
      implicit: !matchFound && isDefault && !this.helpRequested,
      candidate: candidate
    }
  }

  deferHelp(opts: {}) {
    this.helpRequested = opts || {}
    return this
  }

  deferImplicitHelp() {
    this.helpRequestedImplicitly = true
    return this
  }

  addDeferredHelp(helpBuffer: HelBuffer) {
    const groups: Record<string, TypeObject[]> = {}
    const mappedLevels = Object.keys(this.types)
    for (let i = mappedLevels.length - 1, currentLevel: string; i >= 0; i--) {
      currentLevel = mappedLevels[i]
        ; (this.types[currentLevel] || []).forEach(type => {
          if (currentLevel === helpBuffer._usageName || type.datatype !== 'command') {
            if (this.helpRequested || this.helpRequestedImplicitly) type.invalid = false;
            groups[type.helpGroup] = (groups[type.helpGroup] || []).concat(type)
          }
        })
    }
    helpBuffer.groups = groups

    if (!this.helpRequested && !this.helpRequestedImplicitly) {
      helpBuffer.messages = this.messages
      this.code += this.messages.length
    }

    // add/set output to helpBuffer.toString()
    this.output = helpBuffer.toString(this.helpRequested)
    return this
  }

  addHelp(helpBuffer:HelBuffer, opts: {}) {
    return this.deferHelp(opts).addDeferredHelp(helpBuffer)
  }

  deferVersion(opts: DeferVersion) {
    this.versionRequested = opts || {}
    return this
  }

  addDeferredVersion() {
    if (!(this.versionRequested && this.versionRequested.version)) {
      let dir = this.pathLib!.dirname(require!.main!.filename)
      const root = this.pathLib!.parse(dir).root
      let version
      let attempts = 0 // protect against infinite tight loop if libs misbehave
      while (dir !== root && attempts < 999) {
        attempts++
        try {
          version = JSON.parse(this.fsLib!.readFileSync(this.pathLib!.join(dir, 'package.json'), 'utf8')).version
          if (version) break
        } catch (_) {
          dir = this.pathLib!.dirname(dir)
        }
      }
      if (!this.versionRequested) this.versionRequested = {}
      this.versionRequested.version = version || 'Version unknown'
    }
    if (typeof this.versionRequested.version === 'function') this.output = this.versionRequested.version()
    else this.output = this.versionRequested.version as string
    return this
  }

  // weird method names make for easier code searching
  assignValue(id: string, value: unknown) {
    this.values.set(id, value)
  }

  lookupValue(id: string) {
    return this.values.get(id) 
  }

  resetSource(id: string, source: string) {
    this.sources.set(id, { source: source, position: [], raw: [] })
  }

  employSource(id: string, source?: string|null, position?: number, raw?: string) {
    let obj = this.lookupSource(id)
    if (!obj) {
      obj = { source: undefined as any, position: [], raw: [] }
      this.sources.set(id, obj)
    }
    if (typeof source === 'string') obj.source = source
    if (typeof position === 'number') obj.position.push(position)
    if (typeof raw === 'string') obj.raw.push(raw)
  }

  lookupSource(id: string) {
    return this.sources.get(id)
  }

  lookupSourceValue(id: string) {
    const obj = this.lookupSource(id)
    return obj && obj.source
  }

  populateArgv(typeResults: Partial<TypeObject>[]) {
    let detailIndex
    (typeResults as TypeObject[]).forEach(tr => {
      // find and reset detailed object; otherwise add it
      detailIndex = this.details.types.findIndex(t => t.parent === tr.parent && t.datatype === tr.datatype && this.utils.sameArrays(tr.aliases, t.aliases))
      if (detailIndex !== -1) this.details.types[detailIndex] = tr
      else this.details.types.push(tr)

      // if not command, set value for each alias in argv
      if (tr.datatype === 'command') return undefined // do not add command aliases to argv
      tr.aliases.forEach(alias => {
        this.argv[alias] = tr.value
        this.knownArgv[alias] = tr.value
      })
    })
  }

  getUnknownArguments() {
    if (!Array.isArray(this.argv._)) return []
    const endOptions = this.argv._.indexOf('--')
    return this.argv._.slice(0, endOptions === -1 ? this.argv._.length : endOptions)
  }

  getUnknownSlurpedOptions() {
    return Object.keys(this.argv).filter(key => !(key in this.knownArgv)).map(key => {
      return this.slurped.find(arg => arg.parsed.some(p => p.key === key))
    })
  }

  toResult() {
    return {
      code: this.code,
      output: this.output,
      errors: this.errors,
      argv: this.argv,
      details: this.details
    }
  }
}

module.exports = Context
