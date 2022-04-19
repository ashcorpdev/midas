import { BotClient, Command } from "@guildedjs/gil";
import { Message } from "guilded.js";
import consola from "consola"
const { reloadConfiguration } = require('../../../../../config')
const client: BotClient = require('../../../../../lib/client').guildedClient
consola.log('✅ Loaded moderation-linkprotection command.')

/**
 * @todo Make sure that the provided links are added to an approved subdomains configuration file.
 */

/**
 * The following example allows 'google.com' domain links to be posted.
 * @example !midas moderation linkprotection add https://google.com
 * // returns https://google.com added to the approved links list!
 */
/**
 * The following example removes 'google.com' domain links from the approved list.
 * @example !midas moderation linkprotection remove https://google.com
 * // returns https://google.com removed from the approved links list!
 */
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
                    return await message.send('No link provided, please ensure you include a link.')
                } else {
                    const urlPattern = new RegExp(/\[([^\[]+)\](\(.*\))/gm)
                    if (args.text.match(urlPattern)) {
                        let matched = args.text.replace(/\[([^\]]+)\][^\)]+\)/g, '$1') // This strips the markdown formatting off of the link and outputs just the raw text.
                        return await message.send(`${matched} added to the approved links list!`)
                    } else {
                        return await message.send('Invalid link specified!')
                    }
                }
            case "remove":
                if(args.text == undefined) {
                    return await message.send('No link provided, please ensure you include a link.')
                } else {
                    const urlPattern = new RegExp(/\[([^\[]+)\](\(.*\))/gm)
                    if (args.text.match(urlPattern)) {
                        let matched = args.text.replace(/\[([^\]]+)\][^\)]+\)/g, '$1') // This strips the markdown formatting off of the link and outputs just the raw text.
                        return await message.send(`${matched} removed from the approved links list!`)
                    } else {
                        return await message.send('Invalid link specified!')
                    }
                }
            default:
                return await message.reply('Invalid argument specified!')
        }
    }
}