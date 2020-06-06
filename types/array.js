"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeArray = void 0;
const wrapper_1 = __importDefault(require("./wrapper"));
const api_1 = require("./api");
const SOURCE_DEFAULT = api_1.SOURCE_CONSTANTS.SOURCE_DEFAULT;
class TypeArray extends wrapper_1.default {
    constructor(opts) {
        super(Object.assign({ delim: ',', cumulative: true }, opts || {}));
    }
    static get(opts) {
        return new TypeArray(opts);
    }
    configure(opts, override) {
        opts = opts || {};
        if (typeof override === 'undefined')
            override = true;
        super.configure(opts, override);
        if (override || typeof this._delim === 'undefined') {
            if ('delimiter' in opts)
                this._delim = opts.delimiter;
            else if ('delim' in opts)
                this._delim = opts.delim;
        }
        if (override || typeof this._cumulative === 'undefined')
            this._cumulative = 'cumulative' in opts ? opts.cumulative : this._cumulative;
        return this;
    }
    delimiter(d) {
        this._delim = d;
        return this;
    }
    get delim() {
        return this._delim;
    }
    cumulative(c) {
        this._cumulative = c;
        return this;
    }
    get defaultVal() {
        const dv = super.defaultVal;
        return dv ? [].concat(dv) : []; // DO NOT LET getValue AND defaultVal REFERENCE THE SAME ARRAY OBJECT!
    }
    get datatype() {
        const subtype = this.elementType.datatype;
        return 'array' + (subtype ? `:${subtype}` : '');
    }
    buildHelpHints(hints) {
        this.elementType.buildHelpHints(hints);
        const datatypeIndex = hints.findIndex(h => h === this.elementType.datatype);
        if (datatypeIndex !== -1)
            hints[datatypeIndex] = this.datatype;
    }
    isApplicable(context, currentValue, previousValue, slurpedArg) {
        // remove last element if previous value was not explicit
        const v = context.lookupValue(this.id);
        if (v && v.length && typeof previousValue !== 'string')
            v.pop();
        this.elementType.isApplicable(context, currentValue, previousValue, slurpedArg);
        return true; // TODO this is greedy (`--key=one two` includes `one` and `two`), make this configurable
    }
    observeAlias(context, alias) {
        if (!this._cumulative)
            context.assignValue(this.id, []);
        this.elementType.observeAlias(context, alias);
    }
    setValue(context, value) {
        // if current source is 'default', then we're now setting a non-default value
        // so append to a fresh array instead of the default one
        // note that this assumes setValue is called before applySource in api.applyTypes
        if (context.lookupSourceValue(this.id) === SOURCE_DEFAULT)
            context.assignValue(this.id, []);
        if (Array.isArray(value)) {
            const v = context.lookupValue(this.id);
            context.assignValue(this.id, (v || []).concat(value));
            return;
        }
        if (value && this.delim && typeof value === 'string') {
            value.split(this.delim).forEach(v => this.addValue(context, v));
            return;
        }
        this.addValue(context, value);
    }
    addValue(context, value) {
        this.elementType.setValue(context, value);
        let v = context.lookupValue(this.id);
        if (!v) {
            v = [];
            context.assignValue(this.id, v);
        }
        const elementValue = this.elementType.getValue(context);
        if (Array.isArray(elementValue) && v.length && v[v.length - 1] === elementValue) {
            return; // we already have elementValue, it's just been modified
        }
        v.push(elementValue);
    }
    get isStrict() {
        return super.isStrict || this.elementType.isStrict;
    }
    async validateValue(value, context) {
        const validArray = await Promise.all((value || []).map((v) => this.elementType.validateValue(v, context)));
        return (validArray || []).filter(isValid => !isValid).length === 0;
    }
    buildInvalidMessage(context, msgAndArgs) {
        super.buildInvalidMessage(context, msgAndArgs);
        const sub = {};
        this.elementType.buildInvalidMessage(context, sub);
        if (sub.msg)
            msgAndArgs.msg = sub.msg;
        if (sub.args.length > msgAndArgs.args.length)
            msgAndArgs.args = msgAndArgs.args.concat(sub.args.slice(msgAndArgs.args.length));
    }
}
exports.TypeArray = TypeArray;
exports.default = TypeArray;
