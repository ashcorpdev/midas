import Client, { Message } from "guilded.js"
import consola from "consola"
const { configuration } = require('../../config')
const client: Client = require('../client').guildedClient
consola.success('Loaded ping command.')

client.on("messageCreated", async (message: Message) => {
    if(message.content === `${configuration.modules.commands.prefix}ping`) {
        const reply = await client.messages.send(message.channelId, "Pong!")
        client.messages.delete(message.channelId, message.id)
        setTimeout(function(){
            client.messages.delete(message.channelId, reply.id)
        },5000)
    }
})

module.exports = {}
