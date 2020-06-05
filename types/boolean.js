"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = __importDefault(require("./type"));
class TypeBoolean extends type_1.default {
    static get(opts) {
        return new TypeBoolean(opts);
    }
    constructor(opts) {
        super(Object.assign({ defaultValue: false }, opts));
    }
    get datatype() {
        return 'boolean';
    }
    isApplicable(context, currentValue, previousValue, slurpedArg) {
        return typeof currentValue === 'boolean' || currentValue === 'true' || currentValue === 'false';
    }
    setValue(context, value) {
        context.assignValue(this.id, typeof value === 'boolean' ? value : value === 'true');
    }
}
exports.default = TypeBoolean;
