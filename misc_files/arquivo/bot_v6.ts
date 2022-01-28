import P from "pino";
import { Boom } from "@hapi/boom";
import makeWASocket, {
  DisconnectReason,
  AnyMessageContent,
  delay,
  useSingleFileAuthState,
} from "@adiwajshing/baileys-md";
import Mimetype from "@adiwajshing/baileys-md";
import MessageOptions from "@adiwajshing/baileys-md";
import MessageType from "@adiwajshing/baileys-md";
import { getTimeAndDate } from "../../getTimeAndDate";
import { readFromFile } from "../../readFromFile";
import { variableMessage } from "../../variableMessage";
import { salvarConfgChat } from "../../salvarConfgChat";

const customerDataTemplate = require("./customerData/template.json");
const botMsgs = require("./botMsgs.json");
const { state, saveState } = useSingleFileAuthState("./auth_info_multi.json");

//==============================================================================

const Path = require("path");
//supercharged Fs for using Fs.exists() for json and other things
const Fs = require("@supercharge/filesystem");

//validador de cpf
const validarCpfCnpj = require("./VerificaCPF_CNPJ");

const path = Path.join(__dirname, "existing-file.txt");

//==============================================================================

async function connectToWhatsApp() {
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
        sock = startSock();
      }
    } else if (connection === "open") {
      console.log("opened connection");
    }
  });
  sock.ev.on("messages.upsert", (m) => {
    console.log(JSON.stringify(m, undefined, 2));

    console.log("replying to", m.messages[0].key.remoteJid);
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
        console.log(`NOVO CLIENTE/CONTATO DETECTADO: ${accountID}`);
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
        console.log(
          `Configuração padrão do novo contato "${accountID}" criada.`
        );
      }

      //if phone id DOES exist in DB
      //send welcome message
      if (Fs.exists(`./customerData/${accountID}.json`)) {
        //read and parse personal user json
        const customerDataRaw = readFromFile(
          `./customerData/${accountID}.json`
        );
        const customerData = JSON.parse(customerDataRaw);

        console.log(
          `Configuração padrão do novo contato "${accountID}" criada.`
        );
        console.log(customerData.accountID);
        //send non newcomer message
        await sendMessageWTyping(
          {
            text: variableMessage(
              botMsgs.bemVindoClienteAntigo1,
              botMsgs.bemVindoClienteAntigo2,
              botMsgs.bemVindoClienteAntigo3,
              botMsgs.bemVindoClienteAntigo14
            ),
          },
          accountID
        );
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
      await sendMessageWTyping({ text: "Hello there!" }, msg.key.remoteJid);

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
        startSock();
      } else {
        console.log("connection closed");
      }
    }

    console.log("connection update", update);
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

let startSock = () => {
  let sock = makeWASocket({
    logger: P({ level: "trace" }),
    printQRInTerminal: true,
    auth: state,
    // implement to handle retries
    getMessage: async (key) => {
      return {
        conversation: "hello",
      };
    },
  });

  */
