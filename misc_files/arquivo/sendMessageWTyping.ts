//should be declared inside connectToWhatsapp, can't export this func.

import makeWASocket, {
  AnyMessageContent,
  MiscMessageGenerationOptions,
  delay,
} from "@adiwajshing/baileys-md";

const customerDataTemplate = require("./customerData/template.json");
const botMsgs = require("../config_files/botMsgs.json");
const botConfig = require("../config_files/botConfig.json");

// node_mod/string-template is used to convert my json variables.
var format = require("string-template");

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
