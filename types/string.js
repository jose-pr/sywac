"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = __importDefault(require("./type"));
class TypeString extends type_1.default {
    static get(opts) {
        return new TypeString(opts);
    }
    get datatype() {
        return 'string';
    }
    getValue(context) {
        const v = context.lookupValue(this.id);
        if (typeof v === 'undefined' || v === null)
            return v;
        return String(v);
    }
    setValue(context, value) {
        context.assignValue(this.id, typeof value === 'boolean' ? '' : value);
    }
    hasRequiredValue(context) {
        return (super.hasRequiredValue(context) && this.getValue(context));
    }
}
exports.default = TypeString;
