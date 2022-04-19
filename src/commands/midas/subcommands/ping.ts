import { BotClient, Command } from "@guildedjs/gil";
import { Message } from "guilded.js";
import consola from "consola"
const { reloadConfiguration } = require('../../../config')
const client: BotClient = require('../../../lib/client').guildedClient
consola.log('✅ Loaded ping command.')

export default class BotCommand extends Command {
    init() {
    }
    name = "ping"
    cooldown!: {
        seconds: 3,
        allowedUses: 1
    }
    parentCommand = "midas"
    async execute(message: Message, args: Record<string, unknown>) {
        return await message.reply("Pong!")
    }
}