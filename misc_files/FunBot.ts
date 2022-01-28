import P from "pino";
import { Boom } from "@hapi/boom";
import makeWASocket, {
  DisconnectReason,
  AnyMessageContent,
  delay,
  useSingleFileAuthState,
} from "@adiwajshing/baileys-md";
import sendListMessage from "@adiwajshing/baileys-md";
import Mimetype from "@adiwajshing/baileys-md";
import MessageOptions from "@adiwajshing/baileys-md";
import MessageType from "@adiwajshing/baileys-md";

const customerDataTemplate = require("./customerData/template.json");
const botMsgs = require("./botMsgs.json");
const { state, saveState } = useSingleFileAuthState("./auth_info_multi.json");

//____________________________________________________________________________________________

function between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//____________________________________________________________________________________________

//time in YYYY-MM-DD HH:MM:SS
function getTimeAndDate(): string {
  let currentTimestamp = Date.now();

  // new Date object
  let date_ob = new Date(currentTimestamp);

  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();
  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}
//only time HH-MM-SS
function getCurrentTime(): string {
  let currentTimestamp = Date.now();

  // new Date object
  let date_ob = new Date(currentTimestamp);

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
}
//only time no seconds HH-MM
function getCurrentTimeNoSecs(): string {
  let currentTimestamp = Date.now();

  // new Date object
  let date_ob = new Date(currentTimestamp);

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();
  return `${hours}:${minutes}`;
}
//get date only YYYY-MM-DD
function getCurrentDate(): string {
  let currentTimestamp = Date.now();

  // new Date object
  let date_ob = new Date(currentTimestamp);

  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  return `${year}-${month}-${date}`;
}

//____________________________________________________________________________________________

//logger function with timestamp
function log(input, ...args) {
  let time = getCurrentTimeNoSecs();
  console.log(`[${time}] ${input} ${args}`);
}

//____________________________________________________________________________________________

function readFromFile(path) {
  return Fs.readFile(path, "utf8", (err, json) => {
    if (err) {
      console.error(err);
      throw err;
    }

    //const data = JSON.parse(json)
    //console.log(data)
  });
}

//log(variableMessage("le penis", 'ajdhawjhad', 'dlkajdklawakdawkd', 4, 6, true, false))

function variableMessage(...args: any) {
  let messageAmount = args.length;
  let rand = between(0, messageAmount - 1); // randomically choose a valid msg index
  if (rand === undefined) {
    return `Houve um erro.`;
  } else {
    return `${args[rand]}`;
  }
}

//____________________________________________________________________________________________

const Path = require("path");
const Fs = require("@supercharge/filesystem");

const validarCpfCnpj = require("./VerificaCPF_CNPJ");

const path = Path.join(__dirname, "existing-file.txt");

/*
            Use the @supercharge/filesystem Package
            I’m the maintainer of the @supercharge/filesystem package providing convenient file system utilities. Methods in the @supercharge/filesystem package are async by default and don’t block the event loop.

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

// ------------- CONFIGURAÇOES EM JSON: ----------------

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
  const nome = `./${nomeArquivo}.json`;
  Fs.writeFile(nome, JSON.stringify(dados), (err) => {
    if (err) throw err;
    log(`O arquivo de config foi salvo! ID: ${nomeArquivo}`);
  });
}

//____________________________________________________________________________________________

// start a connection
async function connectToWhatsApp() {
  let startSock = () => {
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
  };

  const sendMessageWTyping = async (msg: AnyMessageContent, jid: string) => {
    await sock.presenceSubscribe(jid);
    await delay(500);

    await sock.sendPresenceUpdate("composing", jid);
    await delay(2000);

    await sock.sendPresenceUpdate("paused", jid);

    await sock.sendMessage(jid, msg);
  };

  const sendMediaAsSticker = async (msg: AnyMessageContent, jid: string) => {
    await sock.presenceSubscribe(jid);
    await delay(500);

    await sock.sendPresenceUpdate("composing", jid);
    await delay(2000);

    await sock.sendPresenceUpdate("paused", jid);

    await sock.send(jid, msg);
  };

  //send a template message!
  const templateButtons = [
    {
      index: 1,
      urlButton: {
        displayText: "⭐ Star Baileys on GitHub!",
        url: "https://github.com/adiwajshing/Baileys",
      },
    },
    {
      index: 2,
      callButton: { displayText: "Call me!", phoneNumber: "+1 (234) 5678-901" },
    },
    {
      index: 3,
      quickReplyButton: {
        displayText: "This is a reply, just like normal buttons!",
        id: "id-like-buttons-message",
      },
    },
  ];

  const templateMessage = {
    text: "Hi it's a template message",
    footer: "Hello World",
    templateButtons: templateButtons,
  };

  const sendMsg = await sock.sendMessage(id, templateMessage);

  sock.ev.on("messages.upsert", async (m) => {
    log(JSON.stringify(m, undefined, 2));

    const msg = m.messages[0];
    //if message is NOT fromMe
    if (!msg.key.fromMe && m.type === "notify") {
      let accountID = m.messages[0].key.remoteJid;

      log("replying to", accountID);

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
        { buttonId: "id1", buttonText: { displayText: "Button 1" }, type: 1 },
        { buttonId: "id2", buttonText: { displayText: "Button 2" }, type: 1 },
        { buttonId: "id3", buttonText: { displayText: "Button 3" }, type: 1 },
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

  sock.ev.on("messages.update", (m) => log(m));
  sock.ev.on("presence.update", (m) => log(m));
  sock.ev.on("chats.update", (m) => log(m));
  sock.ev.on("contacts.update", (m) => log(m));

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
