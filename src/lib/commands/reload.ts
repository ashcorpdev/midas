import Client, { Message } from "guilded.js";
const { configuration, reloadConfiguration } = require('../../config');
const client: Client = require('../client').guildedClient;


client.on("messageCreated", async (message: Message) => {
    if(message.content === `${configuration.modules.commands.prefix}reload`) {
        const reply = await client.messages.send(message.channelId, "Reloading commands...")
        await reloadConfiguration().then(() => {
            console.log('Reloaded commands!')
            client.messages.delete(message.channelId, message.id)
            client.messages.update(message.channelId, reply.id, "Reloaded commands!")
            setTimeout(function(){
                client.messages.delete(message.channelId, reply.id)
            },5000);
        }).catch((err: Error) => {
            console.log(`Error reloading commands! ${err}`)
        });
    }
})


console.log('Loaded reload command.')
module.exports = {};
