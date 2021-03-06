"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var pino_1 = require("pino");
var baileys_md_1 = require("@adiwajshing/baileys-md");
var customerDataTemplate = require("./customerData/template.json");
var botMsgs = require("./botMsgs.json");
var _a = baileys_md_1.useSingleFileAuthState("./auth_info_multi.json"), state = _a.state, saveState = _a.saveState;
//____________________________________________________________________________________________
function between(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//____________________________________________________________________________________________
//time in YYYY-MM-DD HH:MM:SS
function getTimeAndDate() {
    var currentTimestamp = Date.now();
    // new Date object
    var date_ob = new Date(currentTimestamp);
    // adjust 0 before single digit date
    var date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    var year = date_ob.getFullYear();
    // current hours
    var hours = date_ob.getHours();
    // current minutes
    var minutes = date_ob.getMinutes();
    // current seconds
    var seconds = date_ob.getSeconds();
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
}
//only time HH-MM-SS
function getCurrentTime() {
    var currentTimestamp = Date.now();
    // new Date object
    var date_ob = new Date(currentTimestamp);
    // current hours
    var hours = date_ob.getHours();
    // current minutes
    var minutes = date_ob.getMinutes();
    // current seconds
    var seconds = date_ob.getSeconds();
    return hours + ":" + minutes + ":" + seconds;
}
//only time no seconds HH-MM
function getCurrentTimeNoSecs() {
    var currentTimestamp = Date.now();
    // new Date object
    var date_ob = new Date(currentTimestamp);
    // current hours
    var hours = date_ob.getHours();
    // current minutes
    var minutes = date_ob.getMinutes();
    return hours + ":" + minutes;
}
//get date only YYYY-MM-DD
function getCurrentDate() {
    var currentTimestamp = Date.now();
    // new Date object
    var date_ob = new Date(currentTimestamp);
    // adjust 0 before single digit date
    var date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    var year = date_ob.getFullYear();
    return year + "-" + month + "-" + date;
}
//____________________________________________________________________________________________
//logger function with timestamp
function log(input) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var time = getCurrentTimeNoSecs();
    console.log("[" + time + "] " + input + " " + args);
}
//____________________________________________________________________________________________
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
//log(variableMessage("le penis", 'ajdhawjhad', 'dlkajdklawakdawkd', 4, 6, true, false))
function variableMessage() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var messageAmount = args.length;
    var rand = between(0, messageAmount - 1); // randomically choose a valid msg index
    if (rand === undefined) {
        return "Houve um erro.";
    }
    else {
        return "" + args[rand];
    }
}
//____________________________________________________________________________________________
var Path = require("path");
var Fs = require("@supercharge/filesystem");
var validarCpfCnpj = require("./VerificaCPF_CNPJ");
var path = Path.join(__dirname, "existing-file.txt");
/*
            Use the @supercharge/filesystem Package
            I???m the maintainer of the @supercharge/filesystem package providing convenient file system utilities. Methods in the @supercharge/filesystem package are async by default and don???t block the event loop.

            You may use the exists method to check if a file path exists on your disk:

            const Path = require('path')
            const Fs = require('@supercharge/filesystem')

            const path = Path.join(__dirname, "existing-file.txt")

            await Fs.exists(path)
            // true

            Enjoy!

          source: https://futurestud.io/tutorials/node-js-check-if-a-file-exists
      */
/* //#region
venom
  .create()
  .then((client) => start(client))
  .catch((error) => console.log(error));
*/ //#endregion
// ------------- CONFIGURA??OES EM JSON: ----------------
// para saber mais sobre escrita de arquivos
// https://www.horadecodar.com.br/2020/07/14/como-criar-arquivos-com-node-js-escrever-arquivos/
/*
function salvarConfgChat(nomeArquivo, dados) {
  const nome = `./Zuck-Bot-Data/${nomeArquivo}.json`
  fs.writeFile(nome, dados, (err) => {
      if (err) throw err
      console.log('O arquivo foi salvo!')
  })
}
*/
//____________________________________________________________________________________________
function salvarConfgChat(nomeArquivo, dados) {
    var nome = "./" + nomeArquivo + ".json";
    Fs.writeFile(nome, JSON.stringify(dados), function (err) {
        if (err)
            throw err;
        log("O arquivo de config foi salvo! ID: " + nomeArquivo);
    });
}
//____________________________________________________________________________________________
// start a connection
function connectToWhatsApp() {
    return __awaiter(this, void 0, void 0, function () {
        var startSock, sendMessageWTyping, sendMediaAsSticker, templateButtons, templateMessage, sendMsg;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startSock = function () {
                        var sock = baileys_md_1["default"]({
                            logger: pino_1["default"](),
                            printQRInTerminal: true,
                            auth: state,
                            // implement to handle retries
                            getMessage: function (key) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, {
                                            conversation: "hello"
                                        }];
                                });
                            }); }
                        });
                    };
                    sendMessageWTyping = function (msg, jid) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sock.presenceSubscribe(jid)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, baileys_md_1.delay(500)];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, sock.sendPresenceUpdate("composing", jid)];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, baileys_md_1.delay(2000)];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, sock.sendPresenceUpdate("paused", jid)];
                                case 5:
                                    _a.sent();
                                    return [4 /*yield*/, sock.sendMessage(jid, msg)];
                                case 6:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    sendMediaAsSticker = function (msg, jid) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sock.presenceSubscribe(jid)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, baileys_md_1.delay(500)];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, sock.sendPresenceUpdate("composing", jid)];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, baileys_md_1.delay(2000)];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, sock.sendPresenceUpdate("paused", jid)];
                                case 5:
                                    _a.sent();
                                    return [4 /*yield*/, sock.send(jid, msg)];
                                case 6:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    templateButtons = [
                        {
                            index: 1,
                            urlButton: {
                                displayText: "??? Star Baileys on GitHub!",
                                url: "https://github.com/adiwajshing/Baileys"
                            }
                        },
                        {
                            index: 2,
                            callButton: { displayText: "Call me!", phoneNumber: "+1 (234) 5678-901" }
                        },
                        {
                            index: 3,
                            quickReplyButton: {
                                displayText: "This is a reply, just like normal buttons!",
                                id: "id-like-buttons-message"
                            }
                        },
                    ];
                    templateMessage = {
                        text: "Hi it's a template message",
                        footer: "Hello World",
                        templateButtons: templateButtons
                    };
                    return [4 /*yield*/, sock.sendMessage(id, templateMessage)];
                case 1:
                    sendMsg = _a.sent();
                    sock.ev.on("messages.upsert", function (m) { return __awaiter(_this, void 0, void 0, function () {
                        var msg, accountID, customerDataRaw, customerData, buttons, buttonMessage;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    log(JSON.stringify(m, undefined, 2));
                                    msg = m.messages[0];
                                    if (!(!msg.key.fromMe && m.type === "notify")) return [3 /*break*/, 7];
                                    accountID = m.messages[0].key.remoteJid;
                                    log("replying to", accountID);
                                    //if phone id does NOT exist in database:
                                    //send welcome message
                                    //create new user file.
                                    if (!Fs.exists("./customerData/" + accountID + ".json")) {
                                        log("NOVO CLIENTE/CONTATO DETECTADO: " + accountID);
                                        //save 'account id' JSON with default template values
                                        salvarConfgChat("./customerData/" + accountID + ".json", customerDataTemplate);
                                        //write account ID to their personal file
                                        customerDataTemplate.accountID = accountID;
                                        customerDataTemplate.lastContactDate = getTimeAndDate();
                                        customerDataTemplate.isNewClient = false;
                                        customerDataTemplate.currentChatLevel = 1; //recebeu a mensagem inicial. este eh o chat level 1
                                        salvarConfgChat("./customerData/" + accountID + ".json", customerDataTemplate);
                                        // save date & time in YYYY-MM-DD HH:MM:SS format
                                        log("Configura\u00E7\u00E3o padr\u00E3o do novo contato \"" + accountID + "\" criada.");
                                    }
                                    if (!Fs.exists("./customerData/" + accountID + ".json")) return [3 /*break*/, 2];
                                    customerDataRaw = readFromFile("./customerData/" + accountID + ".json");
                                    customerData = JSON.parse(customerDataRaw);
                                    log("Configura\u00E7\u00E3o padr\u00E3o do novo contato \"" + accountID + "\" criada.");
                                    log(customerData.accountID);
                                    //send non newcomer message
                                    return [4 /*yield*/, sendMessageWTyping({
                                            text: variableMessage(botMsgs.bemVindoClienteAntigo1, botMsgs.bemVindoClienteAntigo2, botMsgs.bemVindoClienteAntigo3, botMsgs.bemVindoClienteAntigo14)
                                        }, accountID)];
                                case 1:
                                    //send non newcomer message
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [4 /*yield*/, sock.sendReadReceipt(msg.key.remoteJid, msg.key.participant, [
                                        msg.key.id,
                                    ])];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, sendMessageWTyping({ text: "Hello there!" }, msg.key.remoteJid)];
                                case 4:
                                    _a.sent();
                                    // send a simple text!
                                    return [4 /*yield*/, sock.sendMessage(msg.key.remoteJid, { text: "oh hello there" })];
                                case 5:
                                    // send a simple text!
                                    _a.sent();
                                    buttons = [
                                        { buttonId: "id1", buttonText: { displayText: "Button 1" }, type: 1 },
                                        { buttonId: "id2", buttonText: { displayText: "Button 2" }, type: 1 },
                                        { buttonId: "id3", buttonText: { displayText: "Button 3" }, type: 1 },
                                    ];
                                    buttonMessage = {
                                        text: "Hi it's button message",
                                        footer: "Hello World",
                                        buttons: buttons,
                                        headerType: 1
                                    };
                                    //send the message.
                                    return [4 /*yield*/, sock.sendMessage(msg.key.remoteJid, buttonMessage)];
                                case 6:
                                    //send the message.
                                    _a.sent();
                                    _a.label = 7;
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); });
                    sock.ev.on("messages.update", function (m) { return log(m); });
                    sock.ev.on("presence.update", function (m) { return log(m); });
                    sock.ev.on("chats.update", function (m) { return log(m); });
                    sock.ev.on("contacts.update", function (m) { return log(m); });
                    sock.ev.on("connection.update", function (update) {
                        var _a, _b;
                        var connection = update.connection, lastDisconnect = update.lastDisconnect;
                        if (connection === "close") {
                            // reconnect if not logged out
                            if (((_b = (_a = lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) !==
                                baileys_md_1.DisconnectReason.loggedOut) {
                                connectToWhatsApp();
                            }
                            else {
                                log("connection closed");
                            }
                        }
                        log("connection update", update);
                    });
                    // listen for when the auth credentials is updated
                    sock.ev.on("creds.update", saveState);
                    return [2 /*return*/, sock];
            }
        });
    });
}
connectToWhatsApp();
