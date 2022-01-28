import P from "pino";
import { Boom } from "@hapi/boom";
import makeWASocket, {
  DisconnectReason,
  delay,
  useSingleFileAuthState,
  MiscMessageGenerationOptions,
  AnyMessageContent,
} from "@adiwajshing/baileys";
import Mimetype from "@adiwajshing/baileys";
import MessageOptions from "@adiwajshing/baileys";
import MessageType from "@adiwajshing/baileys";
import { getTimeAndDate } from "./getTimeAndDate";
import { readFromFile } from "./readFromFile";
import { variableMessage } from "./variableMessage";
import { salvarConfgChat } from "./salvarConfgChat";
import { log } from "./log";

const customerDataTemplate = require("./customerData/template.json");
const botMsgs = require("../config_files/botMsgs.json");
const botConfig = require("../config_files/botConfig.json");
const { state, saveState } = useSingleFileAuthState("./auth_info_multi.json");

//node_mod/string-template is used to convert my json variables.
var format = require("string-template");
//==============================================================================
//conversor das variaveis no JSON
var greeting;
greeting = format(botMsgs.bemVindoNovoCliente, {
  companyName: botConfig.companyName,
  count: 12,
});

//==============================================================================
//convert content string json to message object

//==============================================================================
const Path = require("path");
//supercharged Fs for using Fs.exists() for json and other things
import Fs from "@supercharge/filesystem";

//validador de cpf
const validarCpfCnpj = require("./VerificaCPF_CNPJ");

const path = Path.join(__dirname, "existing-file.txt");

export async function connectToWhatsApp() {
  let sock = makeWASocket({
    logger: P(),
    printQRInTerminal: true,
    auth: state,
    // implement to handle retries
    getMessage: async (key) => {
      return {
        conversation: "hello",
      };
    },
  });
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect =
        (lastDisconnect.error as Boom)?.output?.statusCode !==
        DisconnectReason.loggedOut;
      log(
        "connection closed due to ",
        lastDisconnect.error,
        ", reconnecting ",
        shouldReconnect
      );
      // reconnect if not logged out
      if (shouldReconnect) {
        connectToWhatsApp();
      }
    } else if (connection === "open") {
      log("opened connection");
    }
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

  async function sendMessageWTyping(
    id: string,
    content: AnyMessageContent,
    options?: MiscMessageGenerationOptions
  ) {
    //vwrong way to do it: probably: await sock.sendPresenceUpdate("available", id).delay(500);

    //send presence typing and also message after
    await sock.sendPresenceUpdate("available", id);
    await delay(500);
    await sock.sendPresenceUpdate("composing", id);
    await delay(500);
    //type WAPresence = 'unavailable' | 'available' | 'composing' | 'recording' | 'paused'
    await sock.sendMessage(id, content);
    await delay(500);
    await sock.sendPresenceUpdate("paused", id);
    await delay(500);
    await sock.sendPresenceUpdate("available", id);
  }

  sock.ev.on("messages.upsert", async (m) => {
    console.log(JSON.stringify(m, undefined, 2));

    log("replying to", m.messages[0].key.remoteJid);
    await sock.sendMessage(m.messages[0].key.remoteJid!, {
      text: "Hello there!",
    });
  });

  sock.ev.on("messages.upsert", async (m) => {
    console.log(JSON.stringify(m, undefined, 2));

    const msg = m.messages[0];
    //if message is NOT fromMe
    if (!msg.key.fromMe && m.type === "notify") {
      let accountID = m.messages[0].key.remoteJid;

      console.log("replying to", accountID);

      //if phone id does NOT exist in database:
      //send welcome message
      //create new user file.
      if (!Fs.exists(`./customerData/${accountID}.json`)) {
        log(`NOVO CLIENTE/CONTATO DETECTADO: ${accountID}`);
        //save 'account id' JSON with default template values
        salvarConfgChat(
          `./customerData/${accountID}.json`,
          customerDataTemplate
        );
        //write account ID to their personal file
        customerDataTemplate.accountID = accountID;
        customerDataTemplate.lastContactDate = getTimeAndDate();
        customerDataTemplate.isNewClient = false;
        customerDataTemplate.currentChatLevel = 1; //recebeu a mensagem inicial. este eh o chat level 1
        salvarConfgChat(
          `./customerData/${accountID}.json`,
          customerDataTemplate
        );
        // save date & time in YYYY-MM-DD HH:MM:SS format
        log(`Configuração padrão do novo contato "${accountID}" criada.`);
        sendMessageWTyping(accountID, botMsgs.bemVindoNovoCliente);
      }

      //if phone id DOES exist in DB
      //send welcome message
      if (Fs.exists(`./customerData/${accountID}.json`)) {
        //read and parse personal user json
        const customerDataRaw = readFromFile(
          `./customerData/${accountID}.json`
        );
        const customerData = JSON.parse(customerDataRaw);

        log(`Configuração padrão do novo contato "${accountID}" criada.`);
        log(customerData.accountID);
        //send non newcomer message
        const msgRandom = variableMessage(
          botMsgs.bemVindoClienteAntigo1,
          botMsgs.bemVindoClienteAntigo2,
          botMsgs.bemVindoClienteAntigo3,
          botMsgs.bemVindoClienteAntigo4
        );

        const msgRandomObj = {
          text: msgRandom,
        };

        await sendMessageWTyping(accountID, msgRandomObj);

        /*if (rand <= 25) {
                    await sendMessageWTyping(botMsgs.clienteAntigo1, accountID)
                }
                if (rand <= 50) {
                    await sendMessageWTyping(botMsgs.clienteAntigo2, accountID)
                }
                if (rand <= 75) {
                    await sendMessageWTyping(botMsgs.clienteAntigo3, accountID)
                }
                if (rand <= 100) {
                    await sendMessageWTyping(botMsgs.clienteAntigo4, accountID)
                }*/
      }

      await sock!.sendReadReceipt(msg.key.remoteJid, msg.key.participant, [
        msg.key.id,
      ]);
      await sendMessageWTyping(msg.key.remoteJid, { text: "Hello there!" });

      // send a simple text!
      await sock.sendMessage(msg.key.remoteJid, { text: "oh hello there" });
      //send a buttons message
      const buttons = [
        {
          buttonId: "id1",
          buttonText: { displayText: "Button 1" },
          type: 1,
        },
        {
          buttonId: "id2",
          buttonText: { displayText: "Button 2" },
          type: 1,
        },
        {
          buttonId: "id3",
          buttonText: { displayText: "Button 3" },
          type: 1,
        },
      ];

      const buttonMessage = {
        text: "Hi it's button message",
        footer: "Hello World",
        buttons: buttons,
        headerType: 1,
      };
      //send the message.
      await sock.sendMessage(msg.key.remoteJid, buttonMessage);

      // list message send:

      /*
              await sock.sendListMessage(personID, buttons, 2)
              sendListMessage(personID, buttons, 2)

              
              await sock.sendMessage(personID, ListMessage, type: MessageType
                */
    }
  });

  sock.ev.on("messages.update", (m) => console.log(m));
  sock.ev.on("presence.update", (m) => console.log(m));
  sock.ev.on("chats.update", (m) => console.log(m));
  sock.ev.on("contacts.update", (m) => console.log(m));

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      // reconnect if not logged out
      if (
        (lastDisconnect.error as Boom)?.output?.statusCode !==
        DisconnectReason.loggedOut
      ) {
        connectToWhatsApp();
      } else {
        log("connection closed");
      }
    }

    log("connection update", update);
  });
  // listen for when the auth credentials is updated
  sock.ev.on("creds.update", saveState);

  return sock;
}

connectToWhatsApp();
// run in main file

//==============================================================================
// start a connection
/*
 */
