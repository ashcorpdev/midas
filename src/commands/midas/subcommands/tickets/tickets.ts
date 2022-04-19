import {BotClient, Command} from "@guildedjs/gil";
import {Message} from "guilded.js";
import consola from "consola"
const { reloadConfiguration } = require('../../../../config')
const client: BotClient = require('../../../../lib/client').guildedClient
consola.log('✅ Loaded tickets command.')


export default class BotCommand extends Command {
    init(): any {
    }
    name = "ticket"
    aliases = ['t', 'tickets']
    cooldown!: {
        seconds: 3,
        allowedUses: 1
    }
    parentCommand = "midas"
    async execute(message: Message, args: Record<string, unknown>): Promise<any> {
        return await message.reply("Funky robit make ticket.")
    }
}

