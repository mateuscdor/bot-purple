"use strict";
exports.__esModule = true;
var baileys_md_1 = require("@adiwajshing/baileys-md");
function sendMessageWRecording(id, content, options) {
    yield sock.sendPresenceUpdate("available", id);
    yield baileys_md_1.delay(500);
    yield sock.sendPresenceUpdate("recording", id);
    yield baileys_md_1.delay(500);
    //type WAPresence = 'unavailable' | 'available' | 'composing' | 'recording' | 'paused'
    yield sock.sendMessage(id, content);
    yield baileys_md_1.delay(500);
    yield sock.sendPresenceUpdate("paused", id);
    yield baileys_md_1.delay(500);
    yield sock.sendPresenceUpdate("available", id);
    yield baileys_md_1.delay(500);
}
