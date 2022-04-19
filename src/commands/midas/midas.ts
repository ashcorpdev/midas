import {BotClient, Command} from "@guildedjs/gil";
import {Message} from "guilded.js";
import consola from "consola"
const { reloadConfiguration } = require('../../config')
const client: BotClient = require('../../lib/client').guildedClient
consola.log('✅ Loaded MIDAS command.')

export default class BotCommand extends Command {
    init(): any {
    }
    name = "midas"
    aliases = ["md"]
    cooldown!: {
        seconds: 3,
        allowedUses: 1
    }
    arguments = [{
      name: "subcommand",
      type: "subcommand",
      required: true,
    }] as const
    async execute(message: Message, args: Record<string, unknown>): Promise<any> {

    }
}
