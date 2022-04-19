import Client, { Member, Message } from "guilded.js"
import consola from "consola"
import fs from 'fs'
import { BotClient } from "@guildedjs/gil"
const { configuration } = require('../config')
const client: BotClient = require('./client').guildedClient

client.on( 'memberJoined', async (member: Member) => {
    consola.info('New member joined.')
    const greeting_text = fs.readFileSync(`./data/welcome/${configuration.modules.welcome.file}`, 'utf-8')
    client.messages.send('dae5ef11-69fd-4cab-96e0-69d91f63aef8', greeting_text)
})