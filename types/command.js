"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeCommand = void 0;
//@ts-ignore
const api_1 = __importDefault(require("../api"));
const type_1 = __importDefault(require("./type"));
class TypeCommand extends type_1.default {
    constructor(opts) {
        // default value is for benefit of context.details.types
        super(Object.assign({ defaultValue: false }, opts));
    }
    static get(opts) {
        return new TypeCommand(opts);
    }
    configure(opts, override) {
        opts = opts || {};
        if (typeof override === 'undefined')
            override = true;
        super.configure(opts, override);
        if (override || !this._api) {
            this._api = opts.api || this._api;
            if (opts.api)
                this._apiConfigured = false;
        }
        if (override || !this._positionalOpts)
            this._positionalOpts = this._assignPositionalOpts(this._positionalOpts || {}, opts);
        if (override || !this._positionalDsl)
            this._positionalDsl = opts.paramsDsl || this._positionalDsl;
        if (override || typeof this._setupHandler !== 'function')
            this._setupHandler = opts.setup || this._setupHandler;
        if (override || typeof this._runHandler !== 'function')
            this._runHandler = opts.run || this._runHandler;
        return this;
    }
    _assignPositionalOpts(target, source) {
        ['params', 'paramsDescription', 'paramsDesc', 'paramsGroup', 'ignore'].forEach(opt => {
            //@ts-ignore
            if (opt in source)
                target[opt] = source[opt];
        });
        return target;
    }
    // if user requests help or a `setup` or `run` callback generates CLI messages,
    // we need to initialize the help buffer in the context of this command.
    _initPossibleHelpBuffer(context) {
        const result = context.helpRequested || context.messages.length;
        if (result && !context.output)
            context.addDeferredHelp(this.api.initHelpBuffer());
        return result;
    }
    get needsApi() {
        return !this._api;
    }
    get api() {
        if (!this._api)
            this._api = api_1.default.get();
        return this._api;
    }
    get isDefault() {
        if (typeof this._default !== 'boolean')
            this._default = this.aliases.some(alias => alias === api_1.default.DEFAULT_COMMAND_INDICATOR);
        return this._default;
    }
    get validAliases() {
        if (!Array.isArray(this._validAliases))
            this._validAliases = this.aliases.filter(alias => alias !== api_1.default.DEFAULT_COMMAND_INDICATOR);
        return this._validAliases;
    }
    get setupHandler() {
        return typeof this._setupHandler === 'function' ? this._setupHandler : () => { };
    }
    get runHandler() {
        return typeof this._runHandler === 'function' ? this._runHandler : () => { };
    }
    get datatype() {
        return 'command';
    }
    get isHidden() {
        if (this.aliases.length === 1 && this.isDefault)
            return true;
        return super.isHidden;
    }
    buildHelpHints(hints) {
        if (this.validAliases.length > 1)
            hints.push('aliases: ' + this.validAliases.slice(1).join(', '));
        if (this.isDefault)
            hints.push('default');
    }
    get helpGroup() {
        return this._group || 'Commands:';
    }
    parse(context) {
        return super.resolve();
    }
    async postParse(context) {
        const match = context.matchCommand(this.api.parentName, this.validAliases, this.isDefault);
        if (!match.explicit && !match.implicit)
            return this.resolve();
        if (match.explicit) {
            // "claim" the arg from context.slurped so logic in unknownType works
            const matchedArg = context.slurped.find(arg => {
                return arg.parsed.length === 1 && !arg.parsed[0].key && !arg.parsed[0].claimed && arg.raw === match.candidate;
            });
            if (matchedArg) {
                matchedArg.parsed[0].claimed = true;
                this.applySource(context, type_1.default.SOURCE_POSITIONAL, matchedArg.index, matchedArg.raw);
            }
        }
        this.setValue(context, true); // set this value to true for context.details
        context.populateArgv([this.toResult(context)]); // apply value to context.details
        if (!this._apiConfigured) {
            this._apiConfigured = true;
            // add positionals from preconfigured opts
            if (typeof this._positionalDsl === 'string' && this._positionalDsl.length) {
                //@ts-ignore
                this.api.positional(this._positionalDsl, this._positionalOpts);
            }
            else if (this._positionalOpts && this._positionalOpts.params) {
                //@ts-ignore
                this.api.positional(this._positionalOpts);
            }
            // TODO add other types from preconfigured opts ?
            // call sync "setup" handler, if defined
            this.setupHandler(this.api);
        }
        await this.api.parseFromContext(context);
        // only run innermost command handler
        if (context.commandHandlerRun)
            return this.resolve();
        context.commandHandlerRun = true;
        this.api.addStrictModeErrors(context);
        if (this._initPossibleHelpBuffer(context))
            return this.resolve();
        const result = await this.runHandler(context.argv, context);
        this._initPossibleHelpBuffer(context);
        return result;
    }
}
exports.TypeCommand = TypeCommand;
exports.default = TypeCommand;
