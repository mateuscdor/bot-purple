var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//imports for the connection
import makeWASocket, { DisconnectReason, useSingleFileAuthState, } from "@adiwajshing/baileys";
import P from "pino";
const { join } = require("path");
const fs = require("fs");
const chalk = require("chalk");
const wa = require("./core/helper");
const TRANSMIT = require("./core/transmission");
const STRINGS = require("./lib/db");
const alive = STRINGS.alive;
const { state, saveState } = useSingleFileAuthState("./auth_info_multi.json");
// start a connection
const startSock = () => {
    let sock = makeWASocket({
        logger: P(),
        printQRInTerminal: true,
        auth: state,
        // implement to handle retries
        getMessage: (key) => __awaiter(void 0, void 0, void 0, function* () {
            return {
                conversation: "hello",
            };
        }),
    });
    sock.ev.on("connection.update", (update) => {
        var _a, _b;
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            const shouldReconnect = ((_b = (_a = lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) !==
                DisconnectReason.loggedOut;
            console.log("connection closed due to ", lastDisconnect.error, ", reconnecting ", shouldReconnect);
            // reconnect if not logged out
            if (shouldReconnect) {
                startSock();
            }
        }
        else if (connection === "open") {
            console.log("opened connection");
        }
    });
    //============================================
    // end connection part
    const commandHandler = new Map();
    const moduleFiles = fs
        .readdirSync(join(__dirname, "modules"))
        .filter((file) => file.endsWith(".ts"));
    let moduleSuccess = true;
    for (const file of moduleFiles) {
        try {
            const command = require(join(__dirname, "modules", `${file}`));
            console.log(chalk.magentaBright("[INFO] Successfully imported module"), chalk.cyanBright.bold(`${file}`));
            commandHandler.set(command.name, command);
        }
        catch (error) {
            moduleSuccess = false;
            console.log(chalk.blueBright.bold("[INFO] Could not import module"), chalk.redBright.bold(`${file}`));
            console.log(`[ERROR] `, error);
            process.exit(-1);
        }
    }
    if (moduleSuccess)
        console.log(chalk.green.bold("[INFO] All Plugins Installed Successfully. The bot is ready to use."));
    else
        console.log(chalk.red.bold("[ERROR] Some plugins weren't installed"));
    sock.ev.on("messages.upsert", (m) => __awaiter(void 0, void 0, void 0, function* () {
        const chat = m.messages[0];
        const sender = chat.key.remoteJid;
        const groupMetaData = sender.endsWith("@g.us")
            ? yield sock.groupMetadata(sender)
            : "";
        const BotsApp = wa.resolve(chat, sock, groupMetaData);
        if (BotsApp.isCmd) {
            console.log(chalk.redBright.bold(`[INFO] ${BotsApp.commandName} command received.`));
            const command = commandHandler.get(BotsApp.commandName);
            const args = BotsApp.body.trim().split(/\s+/).slice(1);
            if (!command) {
                yield TRANSMIT.sendMessageWTyping(sock, BotsApp.chat, {
                    text: "```Woops, invalid command! Use```  *.help*  ```to display the command list.```",
                });
                return;
            }
            else if (command && BotsApp.commandName == "help") {
                try {
                    yield command.handle(sock, chat, BotsApp, args, commandHandler);
                    return;
                }
                catch (err) {
                    console.log(chalk.red("[ERROR] ", err));
                    return;
                }
            }
            try {
                command
                    .handle(sock, chat, BotsApp, args)
                    .catch((err) => console.log("[ERROR] " + err));
            }
            catch (err) {
                console.log(chalk.red("[ERROR] ", err));
            }
        }
    }));
    //commented this out since it's already in the beginning
    /*
    sock.ev.on("connection.update", (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === "close") {
        // reconnect if not logged out
        if (lastDisconnect.error.code !== DisconnectReason.loggedOut) {
          startSock();
        } else {
          console.log("connection closed");
        }
      }
  
      if (connection === "open")
        sock.sendMessage(sock.user.id, { text: alive.ALIVE_MSG });
  
      console.log("connection update", update);
    });
    */
    // listen for when the auth credentials is updated
    sock.ev.on("creds.update", saveState);
    return sock;
};
startSock();
