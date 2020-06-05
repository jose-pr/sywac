"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = __importDefault(require("./string"));
class TypeEnum extends string_1.default {
    constructor(opts) {
        super(Object.assign({ strict: true, caseInsensitive: true }, opts));
    }
    static get(opts) {
        return new TypeEnum(opts);
    }
    configure(opts, override) {
        opts = opts || {};
        if (typeof override === 'undefined')
            override = true;
        super.configure(opts, override);
        if (override || !this._choices.length)
            this._choices = opts.choices ? (this._choices || []).concat(opts.choices) : this._choices;
        if (override || typeof this._caseInsensitive === 'undefined')
            this._caseInsensitive = 'caseInsensitive' in opts ? opts.caseInsensitive : this._caseInsensitive;
        return this;
    }
    get datatype() {
        return 'enum';
    }
    choice(c) {
        if (c)
            this._choices = (this._choices || []).concat(c);
        return this;
    }
    get choices() {
        return this._choices || [];
    }
    buildHelpHints(hints) {
        super.buildHelpHints(hints);
        // if (this.choices.length) hints.push('choices: ' + this.choices.join(', '))
        // if (this.choices.length) hints.push('one of: ' + this.choices.join(', '))
        if (this.choices.length)
            hints.push(this.choices.join(', '));
    }
    validateValue(value) {
        if (!this.choices.length)
            return true;
        value = value && (this._caseInsensitive ? String(value).toLocaleUpperCase() : value);
        return this.choices.some(c => {
            c = this._caseInsensitive ? String(c).toLocaleUpperCase() : String(c);
            return c === value;
        });
    }
    buildInvalidMessage(context, msgAndArgs) {
        super.buildInvalidMessage(context, msgAndArgs);
        if (this.choices.length) {
            msgAndArgs.msg += ' Choices are: %s';
            msgAndArgs.args.push(this.choices.join(', '));
        }
    }
}
exports.default = TypeEnum;
