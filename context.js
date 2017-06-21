'use strict'

class Context {
  static get (opts) {
    return new Context(opts)
  }

  constructor (opts) {
    opts = opts || {}
    // dependencies
    this._utils = opts.utils
    // config
    this.types = {}
    // args to parse per type
    this.args = /* opts.args || */ []
    this.slurped = /* opts.slurped || */ []
    // results of parsing and validation
    this.code = 0
    this.output = ''
    this.argv = /* opts.argv || */ {}
    this.details = /* opts.details || */ { args: [], types: [] }
    // this.errors = []
    // other
    this.commandHandlerRun = false
    this.helpRequested = false
    this.versionRequested = false
  }

  get utils () {
    if (!this._utils) this._utils = require('./lib/utils').get()
    return this._utils
  }

  pushLevel (level, types) {
    this.types[level] = types
    return this
  }

  slurpArgs (args) {
    if (!args) args = process.argv.slice(2)
    if (typeof args === 'string') args = this.utils.stringToArgs(args)
    if (!Array.isArray(args)) args = [].concat(args)
    // TODO read from stdin with no args? based on config?
    let parseable = []
    let extra = []
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

  parseSingleArg (arg) {
    // short-circuit if no flag
    let numBeginningDashes = (arg.match(/^-+/) || [''])[0].length
    if (numBeginningDashes === 0) {
      return [{
        key: '',
        value: arg
      }]
    }
    // otherwise check for =value somewhere in arg
    let kvDelimIndex = arg.indexOf('=')
    let flags = kvDelimIndex > 1 ? arg.substring(numBeginningDashes, kvDelimIndex) : arg.slice(numBeginningDashes)
    let value = kvDelimIndex > 1 ? arg.substring(kvDelimIndex + 1) : undefined
    // can only be one flag with more than 1 dash
    if (numBeginningDashes > 1) {
      return [{
        key: flags,
        value: value || true
      }]
    }
    // may be multiple single-length flags, with value belonging to the last one
    let kvArray = flags.split('').map(flag => {
      return {
        key: flag,
        value: true
      }
    })
    if (value) kvArray[kvArray.length - 1].value = value
    return kvArray
  }

  matchCommand (level, aliases, isDefault) {
    if (!this.argv._ || this.versionRequested) return false // TODO what to do without an unknownType?
    // first determine if argv._ starts with ANY known command alias
    // if there's a match and it's NOT one of the given aliases, return false
    // if there's a match and it IS one of the given aliases, return true
    // if there's NO match and the given isDefault is true, return true
    // otherwise return false
    let candidate = this.argv._[0]
    let matchFound = (this.types[level] || []).some(type => {
      return type.datatype === 'command' && type.aliases.some(alias => alias === candidate)
    })
    return {
      explicit: matchFound && aliases.some(alias => alias === candidate),
      implicit: !matchFound && isDefault && !this.helpRequested
    }
  }

  deferHelp (opts) {
    this.helpRequested = opts || {}
    return this
  }

  addDeferredHelp (helpBuffer) {
    let groups = {}
    // TODO something about group order here
    let mappedLevels = Object.keys(this.types)
    let mappedLevelsLength = mappedLevels.length
    let currentLevel
    for (let i = mappedLevelsLength - 1; i >= 0; i--) {
      currentLevel = mappedLevels[i]
      ;(this.types[currentLevel] || []).forEach(type => {
        if (currentLevel === helpBuffer._usageName || type.datatype !== 'command') groups[type.helpGroup] = (groups[type.helpGroup] || []).concat(type)
      })
    }
    // TODO add examples as a group
    helpBuffer.groups = groups

    // add/set output to helpBuffer.toString()
    this.output = helpBuffer.toString(this.helpRequested)
    return this
  }

  addHelp (helpBuffer, opts) {
    return this.deferHelp(opts).addDeferredHelp(helpBuffer)
  }

  deferVersion (opts) {
    this.versionRequested = opts || {}
    return this
  }

  addDeferredVersion () {
    if (!(this.versionRequested && this.versionRequested.version)) {
      const path = require('path')
      const fs = require('fs')
      let dir = path.dirname(require.main.filename)
      const root = path.parse(dir).root
      let version
      while (dir !== root) {
        try {
          version = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8')).version
          if (version) break
        } catch (_) {
          dir = path.dirname(dir)
        }
      }
      if (!this.versionRequested) this.versionRequested = {}
      this.versionRequested.version = version || 'Version unknown'
    }
    if (typeof this.versionRequested.version === 'function') this.output = this.versionRequested.version()
    else this.output = this.versionRequested.version
    return this
  }

  populateArgv (typeResults) {
    let detailIndex
    typeResults.forEach(tr => {
      // find and reset detailed object; otherwise add it
      detailIndex = this.details.types.findIndex(t => t.parent === tr.parent && t.datatype === tr.datatype && this.utils.sameArrays(tr.aliases, t.aliases))
      if (detailIndex !== -1) this.details.types[detailIndex] = tr
      else this.details.types.push(tr)

      // if not command, set value for each alias in argv
      if (tr.datatype === 'command') return undefined // do not add command aliases to argv
      tr.aliases.forEach(alias => {
        this.argv[alias] = tr.value
      })
    })
  }

  toResult () {
    return {
      code: this.code,
      output: this.output,
      argv: this.argv,
      details: this.details
    }
  }
}

module.exports = Context
