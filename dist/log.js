"use strict";
exports.__esModule = true;
exports.log = void 0;
var getCurrentTimeNoSecs_1 = require("./getCurrentTimeNoSecs");
//==============================================================================
//logger function with timestamp
function log(input) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var time = getCurrentTimeNoSecs_1.getCurrentTimeNoSecs();
    console.log("[" + time + "] " + input + " " + args);
}
exports.log = log;
