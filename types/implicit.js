"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boolean_1 = __importDefault(require("./boolean"));
class TypeImplicitCommand extends boolean_1.default {
    constructor(opts) {
        super(Object.assign({ implicitCommand: true }, opts));
    }
    configure(opts, override) {
        opts = opts || {};
        if (typeof override === 'undefined')
            override = true;
        super.configure(opts, override);
        if (override || typeof this._implicitCommand === 'undefined') {
            this._implicitCommand = 'implicitCommand' in opts ? opts.implicitCommand : this._implicitCommand;
        }
        return this;
    }
    get implicitCommands() {
        if (!this._implicitCommand)
            return [];
        return this.aliases.filter(alias => alias.length > 1);
    }
    buildHelpHints(hints) {
        const commands = this.implicitCommands;
        if (commands.length)
            hints.push('commands: ' + commands.join(', '));
        super.buildHelpHints(hints);
    }
    implicitCommandFound(context, source, position, raw) {
        this.setValue(context, true);
        this.applySource(context, source, position, raw);
    }
}
exports.default = TypeImplicitCommand;
