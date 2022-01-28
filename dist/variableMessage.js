"use strict";
exports.__esModule = true;
exports.variableMessage = void 0;
var between_1 = require("./between");
//log(variableMessage("le penis", 'ajdhawjhad', 'dlkajdklawakdawkd', 4, 6, true, false))
function variableMessage() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    //const messageAmount = arguments.length; //works too
    var messageAmount = args.length;
    var rand = between_1.between(0, messageAmount - 1); // randomically choose a valid msg index
    return "" + arguments[rand];
    /*
    if (rand === undefined) {
      return `Houve um erro ao buscar a mensagem.`;
    } else {
    }
    */
}
exports.variableMessage = variableMessage;
