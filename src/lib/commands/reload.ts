import Client, { Message } from "guilded.js"
import consola from "consola"
const { configuration, reloadConfiguration } = require('../../config')
const client: Client = require('../client').guildedClient
consola.success('Loaded reload command.')

client.on("messageCreated", async (message: Message) => {
    if(message.content === `${configuration.modules.commands.prefix}reload`) {
        const reply = await client.messages.send(message.channelId, "Reloading commands...")
        await reloadConfiguration().then(() => {
            consola.success('Reloaded commands!')
            client.messages.delete(message.channelId, message.id)
            client.messages.update(message.channelId, reply.id, "Reloaded commands!")
            setTimeout(function(){
                client.messages.delete(message.channelId, reply.id)
            },5000)
        }).catch((err: Error) => { consola.error(`Error reloading commands! ${err}`) })
    }
})
module.exports = {}
