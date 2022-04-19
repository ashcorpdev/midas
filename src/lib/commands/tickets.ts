import { MessageCollector } from '@guildedjs/gil'
import Client, { Message } from "guilded.js"
import consola from "consola"
const { configuration, reloadConfiguration } = require('../../config')
const client: Client = require('../client').guildedClient
const first_setup: boolean = require('../tickets').first_setup
consola.log('✅ Loaded tickets command.')

client.on("messageCreated", async (message) => {
    if(configuration.modules.commands.enabled &&
        message.content.startsWith(
          configuration.modules.commands.prefix + "tickets"
        )) {
        consola.log('**[Debug]** Ticket command used')

        let args: string[] = message.content.split(" ")
        let subcommand: string = args[1]
        let command_opts: string = args[2]

        switch (subcommand) {
            case 'setup':
                    if(first_setup) {
                        consola.log('**[Debug]** First setup requested.')
                        client.messages.send(message.channelId, "**[Tickets]** Please give a name to the tickets section:")
                        client.messages.send(message.channelId, `Please type \`${configuration.modules.commands.prefix}tickets new panel\``)
                        
                    }
                break;
        
            default:
                break;
        }
    }
})