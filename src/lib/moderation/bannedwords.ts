import Client, { Member, Message } from "guilded.js"
import fs from 'fs'
const { configuration } = require('../../config')
const client: Client = require('../client').guildedClient
const banned_words = fs.readFileSync(`./data/moderation/${configuration.modules.moderation.submodules.bannedwords.words_list}`, 'utf-8')
let array = banned_words.split(/\r?\n/)
client.on( 'messageCreated', async (message: Message) => {
    let msg = message.content.toLowerCase()
    if(array.some(substring=>msg.includes(substring))) {
        console.log('Message contained a banned word!')
        client.messages.delete(message.channelId, message.id).then(async () => {
            const reply = await client.messages.send(message.channelId, { "isPrivate": true, "replyMessageIds": [message.id] ,content: "Your message contained a banned word and has been deleted."})
            setTimeout(function(){
                client.messages.delete(message.channelId, reply.id)
            },30000)
        }).catch((err) => {
            console.log(err)
        });
    }
})