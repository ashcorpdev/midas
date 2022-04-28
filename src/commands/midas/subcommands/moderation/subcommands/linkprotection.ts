import { Command } from "@guildedjs/gil";
import { Message } from "guilded.js";
import consola from "consola"
const config = require('../../../../../config')
consola.log('✅ Loaded moderation-linkprotection command.')

export default class BotCommand extends Command {
    init() {
    }
    name = "linkprotection"
    aliases = ['links', 'lp']
    cooldown!: {
        seconds: 3,
        allowedUses: 1
    }
    arguments = [{
        name: "subcommand",
        type: "string",
      }, 
      {
        name: "text",
        type: "...string",
      }] as const
    parentCommand = "moderation"
    async execute(message: Message, args: { subcommand: string, text: any}) {
        switch (args.subcommand) {
            case "add":
                if(args.text == undefined) {
                    return await message.send(config.configuration.lang.links.no_link_provided)
                } else {
                    const urlPattern = new RegExp(/\[([^\[]+)\](\(.*\))/gm)
                    if (args.text.match(urlPattern)) {
                        let matched = args.text.replace(/\[([^\]]+)\][^\)]+\)/g, '$1') // This strips the markdown formatting off of the link and outputs just the raw text.
                        return await message.send(config.configuration.lang.links.approved_link)
                    } else {
                        return await message.send(config.configuration.lang.links.invalid_link)
                    }
                }
            case "remove":
                if(args.text == undefined) {
                    return await message.send(config.configuration.lang.links.no_link_provided)
                } else {
                    const urlPattern = new RegExp(/\[([^\[]+)\](\(.*\))/gm)
                    if (args.text.match(urlPattern)) {
                        let matched = args.text.replace(/\[([^\]]+)\][^\)]+\)/g, '$1') // This strips the markdown formatting off of the link and outputs just the raw text.
                        return await message.send(config.configuration.lang.links.blocked_link)
                    } else {
                        return await message.send('')
                    }
                }
            default:
                return await message.reply(config.configuration.lang.commands.invalid_argument)
        }
    }
}