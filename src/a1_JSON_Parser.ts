const botMsgs = require("../config_files/botMsgs.json");
const botConfig = require("../config_files/botConfig.json");
import { log } from "./log";

// node_mod/string-template is used to convert my json variables.
var format = require("string-template");

//parse botMsgs with botConfig variables.

for (let key in botMsgs) {
  log(key + ": " + botMsgs[key]);
  format(botMsgs.key, botConfig.key);
}

format(botMsgs.bemVindoNovoCliente, botConfig.companyName);
log(botMsgs.bemVindoNovoCliente);
/*
format(botMsgs, botConfig.botname);
log(parsedJsonVariables);

var msgs = botMsgs;
var parsedJsonVariables = [];
for (var k in msgs) parsedJsonVariables.push(k);
*/
