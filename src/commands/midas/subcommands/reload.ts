import {BotClient, Command} from "@guildedjs/gil";
import {Message} from "guilded.js";
import consola from "consola"
const { reloadConfiguration } = require('../../../config')
const client: BotClient = require('../../../lib/client').guildedClient
consola.log('✅ Loaded reload command.')

export default class BotCommand extends Command {
    init(): any {
    }
    name = "reload"
    cooldown!: {
        seconds: 3,
        allowedUses: 1
    }
    parentCommand = "midas"
    async execute(message: Message, args: Record<string, unknown>): Promise<any> {
        const bot_reply = await message.send("Reloading commands...")
        consola.info('Reload was requested by a user...')
        await reloadConfiguration().then(() => {
            consola.success('Reloaded commands!')
            this.client.messages.delete(message.channelId, message.id)
            this.client.messages.update(message.channelId, bot_reply.id, "Reloaded commands!")
            setTimeout(() =>{
                this.client.messages.delete(message.channelId, bot_reply.id)
            },5000)
        }).catch((err: Error) => { consola.error(`Error reloading commands! ${err}`) })
    }
}
