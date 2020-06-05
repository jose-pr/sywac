"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const implicit_1 = __importDefault(require("./implicit"));
class TypeHelp extends implicit_1.default {
    constructor(opts) {
        super(Object.assign({ desc: 'Show help' }, opts));
    }
    static get(opts) {
        return new TypeHelp(opts);
    }
    configure(opts, override) {
        opts = opts || {};
        if (typeof override === 'undefined')
            override = true;
        super.configure(opts, override);
        if (override || !this._bufferOpts)
            this._bufferOpts = this._assignBufferOpts(this._bufferOpts || {}, opts);
        return this;
    }
    _assignBufferOpts(target, source) {
        ['includePreface', 'includeUsage', 'includeGroups', 'includeExamples', 'includeEpilogue'].forEach(opt => {
            if (opt in source)
                target[opt] = source[opt];
        });
        return target;
    }
    get bufferOpts() {
        return this._bufferOpts || {};
    }
    validateConfig(utils) {
        if (!this._flags && !this._aliases.length)
            this._aliases.push('help');
        super.validateConfig(utils);
    }
    validateParsed(context) {
        if (this.getValue(context))
            this.requestHelp(context); // must call this before postParse in case of commands
        return this.resolve();
    }
    implicitCommandFound(context, source, position, raw) {
        super.implicitCommandFound(context, source, position, raw);
        this.requestHelp(context); // must call this before postParse in case of commands
    }
    requestHelp(context) {
        context.deferHelp(this.bufferOpts);
    }
}
exports.default = TypeHelp;
