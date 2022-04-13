import Client, { Member, Message } from "guilded.js"
import consola from "consola"
import fs from 'fs'
const { configuration } = require('../config')
const client: Client = require('./client').guildedClient

client.on( 'memberJoined', async (member: Member) => {
    consola.info('New member joined.')
    const greeting = fs.readFileSync(`./data/welcome/${configuration.modules.welcome.file}`, 'utf-8')
    client.messages.send('dae5ef11-69fd-4cab-96e0-69d91f63aef8', greeting)
})