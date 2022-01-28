"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pino_1 = __importDefault(require("pino"));
var baileys_md_1 = __importStar(require("@adiwajshing/baileys-md"));
var getTimeAndDate_1 = require("./getTimeAndDate");
var readFromFile_1 = require("./readFromFile");
var variableMessage_1 = require("./variableMessage");
var salvarConfgChat_1 = require("./salvarConfgChat");
var customerDataTemplate = require("./customerData/template.json");
var botMsgs = require("../config_files/botMsgs.json");
var botConfig = require("../config_files/botConfig.json");
var _a = (0, baileys_md_1.useSingleFileAuthState)("./auth_info_multi.json"), state = _a.state, saveState = _a.saveState;
//==============================================================================
var Path = require("path");
//supercharged Fs for using Fs.exists() for json and other things
var Fs = require("@supercharge/filesystem");
//validador de cpf
var validarCpfCnpj = require("./VerificaCPF_CNPJ");
var path = Path.join(__dirname, "existing-file.txt");
//==============================================================================
function sendMessageWTyping(id, content, options) {
    yield sock.sendPresenceUpdate("available", id);
    yield sock.sendPresenceUpdate("composing", id);
    //type WAPresence = 'unavailable' | 'available' | 'composing' | 'recording' | 'paused'
    yield sock.sendMessage(id, botMsgs.bemVindoNovoCliente);
    yield sock.sendPresenceUpdate("paused", id);
    yield sock.sendPresenceUpdate("available", id);
}
function sendMessageWRecording(id, content, options) {
    yield sock.sendPresenceUpdate("available", id);
    yield sock.sendPresenceUpdate("recording", id);
    //type WAPresence = 'unavailable' | 'available' | 'composing' | 'recording' | 'paused'
    yield sock.sendMessage(id, botMsgs.bemVindoNovoCliente);
    yield sock.sendPresenceUpdate("paused", id);
    yield sock.sendPresenceUpdate("available", id);
}
function connectToWhatsApp() {
    return __awaiter(this, void 0, void 0, function () {
        var sock;
        var _this = this;
        return __generator(this, function (_a) {
            sock = (0, baileys_md_1["default"])({
                logger: (0, pino_1["default"])(),
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
            /*
            let sock = makeWASocket({
              // can provide additional config here
              printQRInTerminal: true,
            });
            sock.ev.on("connection.update", (update) => {
              const { connection, lastDisconnect } = update;
              if (connection === "close") {
                const shouldReconnect =
                  (lastDisconnect.error as Boom)?.output?.statusCode !==
                  DisconnectReason.loggedOut;
                console.log(
                  "connection closed due to ",
                  lastDisconnect.error,
                  ", reconnecting ",
                  shouldReconnect
                );
                // reconnect if not logged out
                if (shouldReconnect) {
                  sock
                }
              } else if (connection === "open") {
                console.log("opened connection");
              }
            });
            */
            //sock termina aqui
            //==============================================================================
            sock.ev.on("messages.upsert", function (m) {
                console.log(JSON.stringify(m, undefined, 2));
                console.log("replying to", m.messages[0].key.remoteJid);
                yield sock.sendMessage(m.messages[0].key.remoteJid, {
                    text: "Hello there!"
                });
            });
            sock.ev.on("messages.upsert", function (m) { return __awaiter(_this, void 0, void 0, function () {
                var msg, accountID, customerDataRaw, customerData, buttons, buttonMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log(JSON.stringify(m, undefined, 2));
                            msg = m.messages[0];
                            if (!(!msg.key.fromMe && m.type === "notify")) return [3 /*break*/, 7];
                            accountID = m.messages[0].key.remoteJid;
                            console.log("replying to", accountID);
                            //if phone id does NOT exist in database:
                            //send welcome message
                            //create new user file.
                            if (!Fs.exists("./customerData/".concat(accountID, ".json"))) {
                                console.log("NOVO CLIENTE/CONTATO DETECTADO: ".concat(accountID));
                                //save 'account id' JSON with default template values
                                (0, salvarConfgChat_1.salvarConfgChat)("./customerData/".concat(accountID, ".json"), customerDataTemplate);
                                //write account ID to their personal file
                                customerDataTemplate.accountID = accountID;
                                customerDataTemplate.lastContactDate = (0, getTimeAndDate_1.getTimeAndDate)();
                                customerDataTemplate.isNewClient = false;
                                customerDataTemplate.currentChatLevel = 1; //recebeu a mensagem inicial. este eh o chat level 1
                                (0, salvarConfgChat_1.salvarConfgChat)("./customerData/".concat(accountID, ".json"), customerDataTemplate);
                                // save date & time in YYYY-MM-DD HH:MM:SS format
                                console.log("Configura\u00E7\u00E3o padr\u00E3o do novo contato \"".concat(accountID, "\" criada."));
                            }
                            if (!Fs.exists("./customerData/".concat(accountID, ".json"))) return [3 /*break*/, 2];
                            customerDataRaw = (0, readFromFile_1.readFromFile)("./customerData/".concat(accountID, ".json"));
                            customerData = JSON.parse(customerDataRaw);
                            console.log("Configura\u00E7\u00E3o padr\u00E3o do novo contato \"".concat(accountID, "\" criada."));
                            console.log(customerData.accountID);
                            //send non newcomer message
                            return [4 /*yield*/, sendMessageWTyping(accountID, (0, variableMessage_1.variableMessage)(botMsgs.bemVindoClienteAntigo1, botMsgs.bemVindoClienteAntigo2, botMsgs.bemVindoClienteAntigo3, botMsgs.bemVindoClienteAntigo4))];
                        case 1:
                            //send non newcomer message
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4 /*yield*/, sock.sendReadReceipt(msg.key.remoteJid, msg.key.participant, [
                                msg.key.id,
                            ])];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, sendMessageWTyping(msg.key.remoteJid, { text: "Hello there!" })];
                        case 4:
                            _a.sent();
                            // send a simple text!
                            return [4 /*yield*/, sock.sendMessage(msg.key.remoteJid, { text: "oh hello there" })];
                        case 5:
                            // send a simple text!
                            _a.sent();
                            buttons = [
                                {
                                    buttonId: "id1",
                                    buttonText: { displayText: "Button 1" },
                                    type: 1
                                },
                                {
                                    buttonId: "id2",
                                    buttonText: { displayText: "Button 2" },
                                    type: 1
                                },
                                {
                                    buttonId: "id3",
                                    buttonText: { displayText: "Button 3" },
                                    type: 1
                                },
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
            sock.ev.on("messages.update", function (m) { return console.log(m); });
            sock.ev.on("presence.update", function (m) { return console.log(m); });
            sock.ev.on("chats.update", function (m) { return console.log(m); });
            sock.ev.on("contacts.update", function (m) { return console.log(m); });
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
                        console.log("connection closed");
                    }
                }
                console.log("connection update", update);
            });
            // listen for when the auth credentials is updated
            sock.ev.on("creds.update", saveState);
            return [2 /*return*/, sock];
        });
    });
}
connectToWhatsApp();
// run in main file
//==============================================================================
// start a connection
/*
 */
