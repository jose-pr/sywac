"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeWrapper = void 0;
const type_1 = require("./type");
class TypeWrapper extends type_1.default {
    configure(opts, override) {
        opts = opts || {};
        if (typeof override === 'undefined')
            override = true;
        super.configure(opts, override);
        if (override || !this._elementType)
            this._elementType = opts.elementType || opts.of || this._elementType;
        return this;
    }
    of(subtype) {
        this._elementType = subtype;
        return this;
    }
    get elementType() {
        if (!this._elementType)
            this._elementType = require('./string').get();
        return this._elementType;
    }
    get datatype() {
        return this.elementType.datatype;
    }
    get shouldValidateDefaultValue() {
        return this.elementType.shouldValidateDefaultValue;
    }
}
exports.TypeWrapper = TypeWrapper;
exports.default = TypeWrapper;
