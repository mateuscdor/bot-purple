"use strict";
exports.__esModule = true;
exports.readFromFile = void 0;
var Fs = require("@supercharge/filesystem");
//==============================================================================
function readFromFile(path) {
    return Fs.readFile(path, "utf8", function (err, json) {
        if (err) {
            console.error(err);
            throw err;
        }
        //const data = JSON.parse(json)
        //console.log(data)
    });
}
exports.readFromFile = readFromFile;
