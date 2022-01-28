import {
  AnyMessageContent,
  delay,
  MiscMessageGenerationOptions,
} from "@adiwajshing/baileys-md";

function sendMessageWRecording(
  id: string,
  content: AnyMessageContent,
  options?: MiscMessageGenerationOptions
) {
  await sock.sendPresenceUpdate("available", id);
  await delay(500);
  await sock.sendPresenceUpdate("recording", id);
  await delay(500);
  //type WAPresence = 'unavailable' | 'available' | 'composing' | 'recording' | 'paused'
  await sock.sendMessage(id, content);
  await delay(500);
  await sock.sendPresenceUpdate("paused", id);
  await delay(500);
  await sock.sendPresenceUpdate("available", id);
  await delay(500);
}
