import { MessageType, MessageOptions, Mimetype } from '@adiwajshing/baileys'
// Sending gifs
await sock.sendMessage(
    id, 
    { 
        video: fs.readFileSync("Media/ma_gif.mp4"), 
        caption: "hello!",
        gifPlayback: true
    }
)

await sock.sendMessage(
    id, 
    { 
        video: "./Media/ma_gif.mp4", 
        caption: "hello!",
        gifPlayback: true
    }
)

// send an audio file
await sock.sendMessage(
    id, 
    { audio: { url: "./Media/audio.mp3" }, mimetype: 'audio/mp4' }
    { url: "Media/audio.mp3" }, // can send mp3, mp4, & ogg
)

// send a buttons message with image header!
const buttons = [
  {buttonId: 'id1', buttonText: {displayText: 'Button 1'}, type: 1},
  {buttonId: 'id2', buttonText: {displayText: 'Button 2'}, type: 1},
  {buttonId: 'id3', buttonText: {displayText: 'Button 3'}, type: 1}
]

const buttonMessage = {
    image: {url: 'https://example.com/image.jpeg'},
    caption: "Hi it's button message",
    footerText: 'Hello World',
    buttons: buttons,
    headerType: 4
}

const sendMsg = await sock.sendMessage(id, buttonMessage)

//send a template message with an image **attached**!
const templateButtons = [
  {index: 1, urlButton: {displayText: '⭐ Star Baileys on GitHub!', url: 'https://github.com/adiwajshing/Baileys'}},
  {index: 2, callButton: {displayText: 'Call me!', phoneNumber: '+1 (234) 5678-901'}},
  {index: 3, quickReplyButton: {displayText: 'This is a reply, just like normal buttons!', id: 'id-like-buttons-message'}},
]

const buttonMessage = {
    text: "Hi it's a template message",
    footer: 'Hello World',
    templateButtons: templateButttons,
    image: {url: 'https://example.com/image.jpeg'}
}

const sendMsg = await sock.sendMessage(id, templateMessage)