"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOpts = exports.SOURCE_CONSTANTS = void 0;
var SOURCE_CONSTANTS;
(function (SOURCE_CONSTANTS) {
    SOURCE_CONSTANTS["SOURCE_DEFAULT"] = "default";
    SOURCE_CONSTANTS["SOURCE_FLAG"] = "flag";
    SOURCE_CONSTANTS["SOURCE_POSITIONAL"] = "positional";
})(SOURCE_CONSTANTS = exports.SOURCE_CONSTANTS || (exports.SOURCE_CONSTANTS = {}));
function normalizeOpts(flags, opts) {
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
exports.normalizeOpts = normalizeOpts;
