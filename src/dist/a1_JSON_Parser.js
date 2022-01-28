"use strict";
exports.__esModule = true;
var botMsgs = require("../config_files/botMsgs.json");
var botConfig = require("../config_files/botConfig.json");
var log_1 = require("./log");
// node_mod/string-template is used to convert my json variables.
var format = require("string-template");
//parse botMsgs with botConfig variables.
for (var key in botMsgs) {
    log_1.log(key + ": " + botMsgs[key]);
    format(botMsgs.key, botConfig.key);
}
format(botMsgs.bemVindoNovoCliente, botConfig.companyName);
log_1.log(botMsgs.bemVindoNovoCliente);
/*
format(botMsgs, botConfig.botname);
log(parsedJsonVariables);

var msgs = botMsgs;
var parsedJsonVariables = [];
for (var k in msgs) parsedJsonVariables.push(k);
*/
