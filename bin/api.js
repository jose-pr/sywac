"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const factory_1 = require("./helpers/factory");
/**@ignore*/
const HELP_OPTS = [
    'lineSep', 'sectionSep', 'pad', 'indent', 'split', 'icon', 'slogan',
    'usagePrefix', 'usageHasOptions', 'groupOrder', 'epilogue', 'maxWidth',
    'examplePrefix', 'exampleOrder', 'usageCommandPlaceholder',
    'usageArgsPlaceholder', 'usageOptionsPlaceholder', 'showHelpOnError',
    'styleGroup', 'styleGroupError', 'styleFlags', 'styleFlagsError',
    'styleDesc', 'styleDescError', 'styleHints', 'styleHintsError', 'styleMessages',
    'styleUsagePrefix', 'styleUsagePositionals', 'styleUsageCommandPlaceholder',
    'styleUsageArgsPlaceholder', 'styleUsageOptionsPlaceholder', 'styleExample',
    'styleAll'
];
class Api {
    constructor(opts) {
        var _a, _b, _c, _d;
        this.types = [];
        this._factories = {};
        this._magicCommandAdded = false;
        opts = opts !== null && opts !== void 0 ? opts : {};
        this._helpOpts = (_a = opts.helpOpts) !== null && _a !== void 0 ? _a : {};
        this._showHelpByDefault = (_b = opts === null || opts === void 0 ? void 0 : opts.showHelpByDefault) !== null && _b !== void 0 ? _b : false;
        this._strictMode = (_c = opts.strictMode) !== null && _c !== void 0 ? _c : false;
        this._modulesSeen = (_d = opts.modulesSeen) !== null && _d !== void 0 ? _d : [];
        factory_1.registerProvidedFactories(this);
        this.configure(opts);
        if (!this.SYWAC.ROOT_NAME)
            this.SYWAC.ROOT_NAME = this.name;
    }
    get SYWAC() { return Api; }
    static get SOURCE_DEFAULT() { return 'default'; }
    static get SOURCE_FLAG() { return 'flag'; }
    static get SOURCE_POSITIONAL() { return 'positional'; }
    static get DEFAULT_COMMAND_INDICATOR() { return '*'; }
    static get(opts) {
        return new Api(opts);
    }
    static normalizeTypeOpts(flags, opts) {
        opts = opts || {};
        if (Array.isArray(flags)) {
            opts.aliases = flags; // treat an array as aliases
        }
        else if (typeof flags === 'string') {
            opts.flags = flags; // treat a string as flags
        }
        else if (typeof flags === 'object') {
            opts = flags;
        }
        return opts;
    }
    configure(opts) {
        opts = opts !== null && opts !== void 0 ? opts : {};
        // lazily configured instance dependencies (expects a single instance)
        this._utils = opts.utils || this._utils;
        this._pathLib = opts.pathLib || this._pathLib;
        this._fsLib = opts.fsLib || this._fsLib;
        // lazily configured factory dependencies (expects a function to call per instance)
        if (opts.factories) {
            Object.keys(opts.factories).forEach(name => this.registerFactory(name, opts.factories[name]));
        }
        // other
        this._name = opts.name || this._name;
        this._parentName = opts.parentName || this._parentName; // TODO this seems awfully hacky
        return this;
    }
    newChild(commandName, childOptions) {
        return new Api(Object.assign({
            factories: this._factories,
            utils: this.utils,
            pathLib: this.pathLib,
            fsLib: this.fsLib,
            name: this.name + ' ' + commandName,
            parentName: this.name,
            modulesSeen: this._modulesSeen.slice(),
            helpOpts: factory_1.assignOpts({}, this.helpOpts, HELP_OPTS),
            showHelpByDefault: this._showHelpByDefault,
            strictMode: this._strictMode
        }, childOptions));
    }
    // lazy dependency accessors
    get unknownType() {
        if (!this._unknownType)
            this._unknownType = this.get('unknownType').withParent(Api.ROOT_NAME);
        return this._unknownType;
    }
    get utils() {
        if (!this._utils)
            this._utils = require('./lib/utils').get();
        return this._utils;
    }
    get helpOpts() {
        return this._helpOpts;
    }
    get pathLib() {
        if (!this._pathLib)
            this._pathLib = require('path');
        return this._pathLib;
    }
    get fsLib() {
        if (!this._fsLib)
            this._fsLib = require('fs');
        return this._fsLib;
    }
    get name() {
        if (typeof this._name !== 'string')
            this._name = this.pathLib.basename(process.argv[1], '.js');
        return this._name;
    }
    get parentName() {
        return this._parentName || 'node';
    }
    // type factories
    registerFactory(name, factory) {
        if (name && typeof factory === 'function')
            this._factories[name] = factory;
        return this;
    }
    registerOption(name, shorcut, factory) {
        const that = this;
        if (factory)
            this.registerFactory(name, factory);
        //@ts-ignore
        that[shorcut] = ((flags, opts) => {
            return that._addOptionType(flags, opts, 'helpType');
        });
        return that;
    }
    get(name, opts) {
        const that = this;
        if (name && this._factories[name])
            return this._factories[name].call(that, opts);
        return null;
    }
    // help text
    preface(icon, slogan) {
        this.helpOpts.icon = icon;
        this.helpOpts.slogan = slogan;
        return this;
    }
    usage(usage) {
        if (typeof usage === 'string')
            this.helpOpts.usage = usage;
        else if (usage) {
            const keyMap = {
                usage: 'usage',
                prefix: 'usagePrefix',
                commandPlaceholder: 'usageCommandPlaceholder',
                argsPlaceholder: 'usageArgsPlaceholder',
                optionsPlaceholder: 'usageOptionsPlaceholder'
            };
            Object.keys(keyMap).forEach(key => {
                //@ts-ignore
                if (key in usage)
                    this.helpOpts[keyMap[key]] = usage[key];
            });
        }
        return this;
    }
    groupOrder(orderArray) {
        if (Array.isArray(orderArray) || typeof orderArray === 'undefined')
            this.helpOpts.groupOrder = orderArray;
        return this;
    }
    example(example, opts) {
        opts = opts || {};
        if (typeof example === 'string') {
            opts.flags = example;
        }
        else if (!Array.isArray(example) && typeof example === 'object') {
            opts = example;
        }
        const group = opts.group || 'Examples:';
        if (!this.helpOpts.examples)
            this.helpOpts.examples = {};
        this.helpOpts.examples[group] = (this.helpOpts.examples[group] || []).concat(opts);
        return this;
    }
    exampleOrder(orderArray) {
        if (Array.isArray(orderArray) || typeof orderArray === 'undefined')
            this.helpOpts.exampleOrder = orderArray;
        return this;
    }
    epilogue(epilogue) {
        this.helpOpts.epilogue = epilogue;
        return this;
    }
    outputSettings(settings) {
        if (!settings)
            return this;
        ['lineSep', 'sectionSep', 'pad', 'indent', 'split', 'maxWidth', 'examplePrefix', 'showHelpOnError'].forEach(opt => {
            //@ts-ignore
            if (opt in settings)
                this.helpOpts[opt] = settings[opt];
        });
        return this;
    }
    style(hooks) {
        if (!hooks)
            return this;
        [
            'group', 'groupError', 'flags', 'flagsError', 'desc', 'descError', 'hints',
            'hintsError', 'messages', 'usagePrefix', 'usagePositionals', 'usageCommandPlaceholder',
            'usageArgsPlaceholder', 'usageOptionsPlaceholder', 'example', 'all'
        ].forEach(key => {
            //@ts-ignore
            if (typeof hooks[key] === 'function') {
                const helpOptsKey = 'style' + key[0].toUpperCase() + key.slice(1);
                //@ts-ignore
                this.helpOpts[helpOptsKey] = hooks[key];
            }
        });
        return this;
    }
    /**
     *
     * @param boolean Defaults to `true`
     */
    showHelpByDefault(boolean) {
        this._showHelpByDefault = boolean !== false;
        return this;
    }
    /**
     *
     * @param boolean Defaults to `true`
     */
    strict(boolean) {
        this._strictMode = boolean !== false;
        return this;
    }
    addStrictModeErrors(context) {
        if (this._strictMode) {
            const unknownOptions = context.getUnknownSlurpedOptions();
            if (unknownOptions.length > 0) {
                context.cliMessage(`Unknown options: ${unknownOptions.map(u => u.raw).join(', ')}`);
            }
            const unknownArguments = context.getUnknownArguments();
            if (unknownArguments.length > 0) {
                context.cliMessage(`Unknown arguments: ${unknownArguments.join(' ')}`);
            }
        }
    }
    // complex types
    commandDirectory(dir, opts) {
        if (typeof dir === 'object') {
            opts = dir;
            dir = '';
        }
        opts = Object.assign({}, opts);
        if (!Array.isArray(opts.extensions))
            opts.extensions = ['.js'];
        let searchDir;
        if (dir && typeof dir === 'string' && this.pathLib.isAbsolute(dir)) {
            searchDir = dir;
        }
        else {
            const callerFile = this.utils.getCallerFile();
            if (this._modulesSeen.indexOf(callerFile) === -1)
                this._modulesSeen.push(callerFile);
            searchDir = this.pathLib.dirname(callerFile);
            if (dir && typeof dir === 'string')
                searchDir = this.pathLib.resolve(searchDir, dir);
        }
        let filepath;
        let mod;
        this.fsLib.readdirSync(searchDir).forEach(fileInDir => {
            filepath = this.pathLib.join(searchDir, fileInDir);
            if (opts.extensions.indexOf(this.pathLib.extname(fileInDir)) !== -1 && this._modulesSeen.indexOf(filepath) === -1) {
                this._modulesSeen.push(filepath);
                mod = require(filepath);
                if (mod.flags || mod.aliases) {
                    this._internalCommand(mod);
                }
                else if (typeof mod === 'function') {
                    //@ts-ignore
                    this._internalCommand({
                        aliases: this.pathLib.basename(fileInDir, this.pathLib.extname(fileInDir)),
                        run: mod
                    });
                }
            }
        });
        return this;
    }
    command(dsl, opts /*TypeCommandOptions<A>*/) {
        this._internalCommand(dsl, opts);
        return this;
    }
    _internalCommand(dsl, opts) {
        opts = opts || {};
        // argument shuffling
        if (typeof opts === 'function') {
            opts = { run: opts };
        }
        if (dsl && typeof dsl === 'object') {
            opts = Object.assign({}, dsl, opts);
        }
        else if (typeof dsl === 'string') {
            opts = Object.assign({}, opts);
            opts.flags = dsl;
        }
        else {
            opts = Object.assign({}, opts);
        }
        if (!opts.flags && opts.aliases)
            opts.flags = [].concat(opts.aliases)[0];
        // opts is an object and opts.flags is the dsl
        // split dsl into name/alias and positionals
        // then populate opts.aliases and opts.params
        const mp = this.utils.stringToMultiPositional(opts.flags);
        const name = mp.shift();
        opts.aliases = opts.aliases ? Array.from(new Set([name].concat(opts.aliases))) : [name];
        if (mp.length) {
            this.helpOpts.usageHasArgs = true;
            if (!opts.params)
                opts.params = mp;
            else if (!opts.paramsDsl)
                opts.paramsDsl = mp.join(' ');
        }
        this.helpOpts.usageHasCommand = true;
        const commandType = this.get('commandType', opts);
        this.custom(commandType);
        return commandType;
    }
    positional(dsl, opts) {
        opts = Object.assign({}, opts); // copy object so we don't alter object with external refs
        let addedToHelp = false;
        // TODO this logic is repetitive and messy
        if (Array.isArray(dsl)) {
            opts.params = dsl.slice();
        }
        else if (typeof dsl === 'object') {
            if (dsl.params)
                opts = Object.assign({}, dsl);
            else
                opts.params = Object.assign({}, dsl);
        }
        else if (typeof dsl === 'string') {
            this.helpOpts.usagePositionals = (this.helpOpts.usagePositionals || []).concat(dsl);
            addedToHelp = true;
            const array = this.utils.stringToMultiPositional(dsl);
            if (!opts.params) {
                opts.params = array;
            }
            else if (Array.isArray(opts.params)) {
                opts.params = array.map((string, index) => {
                    //@ts-ignore
                    return opts.params[index] ? Object.assign({ flags: string }, opts.params[index]) : string;
                });
            }
            else {
                opts.params = Object.keys(opts.params).map((key, index) => {
                    //@ts-ignore
                    let obj = opts.params[key];
                    if (obj && !obj.flags)
                        obj = Object.assign({ flags: array[index] }, obj);
                    // if (obj && !obj.aliases) obj.aliases = key
                    return obj;
                });
            }
        }
        //@ts-ignore
        opts.ignore = [].concat(opts.ignore).filter(Boolean);
        const params = Array.isArray(opts.params) ? opts.params.slice() : Object.keys(opts.params).map(key => {
            //@ts-ignore
            let obj = opts.params[key];
            if (obj && !obj.flags)
                obj = Object.assign({ flags: key }, obj);
            return obj;
        });
        let numSkipped = 0;
        params.forEach((param, index) => {
            if (!param)
                return numSkipped++;
            // accept an array of strings or objects
            if (typeof param === 'string')
                param = { flags: param };
            else
                param = Object.assign({}, param);
            if (!param.flags && param.aliases)
                param.flags = [].concat(param.aliases)[0];
            if (!addedToHelp)
                this.helpOpts.usagePositionals = (this.helpOpts.usagePositionals || []).concat(param.flags);
            // allow "commentary" things in positional dsl string via opts.ignore
            //@ts-ignore
            if (~opts.ignore.indexOf(param.flags))
                return numSkipped++;
            // TODO if no flags or aliases, throw error
            // convenience to define descriptions in opts
            //@ts-ignore
            if (!(param.description || param.desc) && (opts.paramsDescription || opts.paramsDesc)) {
                //@ts-ignore
                param.desc = [].concat(opts.paramsDescription || opts.paramsDesc)[index - numSkipped];
            }
            //@ts-ignore
            if (!param.group && opts.paramsGroup)
                param.group = opts.paramsGroup;
            // don't apply command desc to positional params (via configure calls below)
            //@ts-ignore
            const optsDescription = opts.description;
            //@ts-ignore
            const optsDesc = opts.desc;
            //@ts-ignore
            delete opts.description;
            //@ts-ignore
            delete opts.desc;
            // inferPositionalProperties will generate flags/aliases for wrapped elementType needed for parsing
            const positionalFlags = param.flags;
            delete param.flags;
            param = Object.assign(this.utils.inferPositionalProperties(positionalFlags, Object.keys(this._factories)), param);
            //@ts-ignore
            if (!param.elementType)
                param.elementType = this._getType(param).configure(opts, false);
            param.flags = positionalFlags;
            //@ts-ignore
            const positional = this.get('positional', param).configure(opts, false);
            //@ts-ignore
            opts.description = optsDescription;
            //@ts-ignore
            opts.desc = optsDesc;
            //@ts-ignore
            if (this.unknownType)
                this.unknownType.addPositional(positional);
            this.custom(positional);
        });
        return this;
    }
    // configure any arg type
    custom(type) {
        if (type) {
            if (typeof type.withParent === 'function')
                type.withParent(this.name);
            if (typeof type.validateConfig === 'function')
                type.validateConfig(this.utils);
            this.types.push(type);
        }
        return this;
    }
    //@ts-ignore
    _addOptionType(flags, opts, name) {
        //@ts-ignore
        this.helpOpts.usageHasOptions = true;
        //@ts-ignore
        return this.custom(this._getType(flags, opts, name));
    }
    //@ts-ignore
    _getType(flags, opts, name) {
        opts = Api.normalizeTypeOpts(flags, opts);
        name = String(name || opts.type);
        if (name.indexOf(':') !== -1) {
            const types = name.split(':').filter(Boolean);
            if (types[0] === 'array')
                return this._getArrayType(flags, opts, types.slice(1).join(':') || 'string');
            name = types[0];
        }
        return this.get(name, opts);
    }
    //@ts-ignore
    _getArrayType(flags, opts, subtypeName) {
        opts = Api.normalizeTypeOpts(flags, opts); // TODO this may be redundant
        subtypeName = String(subtypeName || opts.type);
        if (subtypeName.indexOf(':') !== -1) {
            const types = subtypeName.split(':').filter(Boolean);
            if (types[0] === 'array') {
                opts.elementType = this._getArrayType(flags, opts, types.slice(1).join(':') || 'string');
                return this.get('array', opts);
            }
            subtypeName = types[0];
        }
        opts.elementType = this.get(subtypeName, opts);
        return this.get('array', opts);
    }
    // specify 'type' (as string) in opts
    option(flags, opts) {
        //@ts-ignore
        return this._addOptionType(flags, opts);
    }
    // TODO more types
    // lifecycle hook
    check(handler) {
        //@ts-ignore
        this._checkHandler = handler;
        return this;
    }
    // parse and exit if there's output (e.g. help text) or a non-zero code; otherwise resolves to argv
    // useful for standard CLIs
    //@ts-ignore
    async parseAndExit(args, state) {
        const context = await this._parse(args, state);
        const result = context.toResult();
        if (result.output) {
            // note that we want context.helpRequestedImplicitly to output to stderr, not stdout
            const level = ((context.helpRequested || context.versionRequested) && result.code === 0) ? 'log' : 'error';
            console[level](result.output);
            process.exit(result.code);
        }
        if (result.code !== 0)
            process.exit(result.code);
        return result.argv;
    }
    // parse and resolve to a context result (never exits)
    // useful for chatbots or checking results
    //@ts-ignore
    async parse(args, state) {
        const context = await this._parse(args, state);
        return context.toResult();
    }
    async _parse(args, state) {
        // init context and kick off recursive type parsing/execution
        const context = this.initContext(false, state).slurpArgs(args);
        // init unknownType in context only for the top-level (all levels share/overwrite the same argv._)
        if (this.unknownType) {
            this.unknownType.setValue(context, this.unknownType.defaultVal);
            this.unknownType.applySource(context, this.SYWAC.SOURCE_DEFAULT);
        }
        if (this._showHelpByDefault && !context.details.args.length) {
            // preemptively request help (to stderr)
            context.deferImplicitHelp();
        }
        try {
            await this.parseFromContext(context);
            if (!context.commandHandlerRun && !context.output) {
                this.addStrictModeErrors(context);
            }
            if ((context.helpRequested || context.helpRequestedImplicitly) && !context.output) {
                context.addDeferredHelp(this.initHelpBuffer());
            }
            else if (context.versionRequested && !context.output) {
                context.addDeferredVersion();
            }
            else if (context.messages.length && !context.output) {
                context.addDeferredHelp(this.initHelpBuffer());
            }
        }
        catch (err) {
            context.unexpectedError(err);
        }
        return context;
    }
    // recursive, meant to be used internally
    async parseFromContext(context) {
        // first complete configuration for special types
        let hasCommands = false;
        let hasDefaultCommand = false;
        this.types.forEach(type => {
            //@ts-ignore
            if (type.needsApi)
                type.configure({ api: this.newChild(type.aliases[0]) }, false);
            //@ts-ignore
            const implicit = type.implicitCommands;
            //@ts-ignore
            if (implicit && implicit.length)
                this.unknownType.addImplicit(implicit, type);
            if (type.datatype === 'command') {
                hasCommands = true;
                //@ts-ignore
                if (type.isDefault)
                    hasDefaultCommand = true;
            }
        });
        if (!this._magicCommandAdded && this._showHelpByDefault && hasCommands && !hasDefaultCommand) {
            this._magicCommandAdded = true;
            //@ts-ignore
            this._internalCommand(Api.DEFAULT_COMMAND_INDICATOR, (argv, context) => {
                context.deferImplicitHelp().addDeferredHelp(this.initHelpBuffer());
                //@ts-ignore
            }).configure({ api: this.newChild(Api.DEFAULT_COMMAND_INDICATOR, { strictMode: false }) }, false);
        }
        // add known types to context
        this.applyTypes(context);
        // run async parsing for all types except unknown
        const parsePromises = this.types.map(type => type.parse(context));
        await Promise.all(parsePromises);
        // now run async parsing for unknown
        if (this.unknownType) {
            await this.unknownType.parse(context);
            // once all parsing is complete, populate argv in context (sync)
            // first add unknownType to context.argv (because it's needed to determine shouldCoerceAndCheck)
            context.populateArgv([this.unknownType.toResult(context, true)]);
        }
        // next determine shouldCoerceAndCheck
        const shouldCoerceAndCheck = this.shouldCoerceAndCheck(context);
        // then populate argv with other types, letting them know if it makes sense to apply coercion
        context.populateArgv(this.types.map(type => type.toResult(context, shouldCoerceAndCheck)));
        // TODO before postParse, determine if any are promptable (and need prompting) and prompt each in series
        // run custom api-level async argv check/hook between argv population and command execution
        // it should use context.cliMessage to report errors (or can otherwise manipulate context)
        //@ts-ignore
        if (typeof this._checkHandler === 'function' && shouldCoerceAndCheck) {
            //@ts-ignore
            await this._checkHandler(context.argv, context);
        }
        // run async post-parsing
        let postParse = this.types.map(type => type.postParse(context)); // this potentially runs commands
        if (this.unknownType)
            postParse = postParse.concat(this.unknownType.postParse(context));
        return Promise.all(postParse);
    }
    initContext(includeTypes, state) {
        //@ts-ignore
        const context = this.get('_context', {
            //@ts-ignore
            utils: this.utils,
            pathLib: this.pathLib,
            fsLib: this.fsLib,
            state
        });
        return includeTypes ? this.applyTypes(context) : context;
    }
    applyTypes(context) {
        //@ts-ignore
        context.pushLevel(this.name, this.types.map(type => {
            type.setValue(context, type.defaultVal);
            type.applySource(context, this.SYWAC.SOURCE_DEFAULT);
            return type.toObject();
        }));
        return context;
    }
    initHelpBuffer() {
        const helpOpts = Object.assign({ utils: this.utils, usageName: this.name }, this.helpOpts);
        return this.get('helpBuffer', helpOpts);
    }
    // clear as mud? this predicts the future, essentially the inverse of conditions found in parse after
    // parseFromContext and also the conditions that would make the showHelpByDefault command run
    // basically, we don't want to run the custom check handler if help text or version will be output
    shouldCoerceAndCheck(context) {
        return !context.helpRequested &&
            !context.helpRequestedImplicitly &&
            !context.versionRequested &&
            !(context.messages && context.messages.length) &&
            (!this._magicCommandAdded || context.explicitCommandMatch(this.name));
    }
    // optional convenience methods
    getHelp(opts) {
        //@ts-ignore
        return this.initContext(true).addHelp(this.initHelpBuffer(), opts).output;
    }
}
exports.Api = Api;
exports.default = Api;
