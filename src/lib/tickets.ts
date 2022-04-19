import Client, { Member, Message } from "guilded.js"
import consola from "consola"
import { BotClient } from "@guildedjs/gil"
const { configuration } = require('../config')
const client: BotClient = require('./client').guildedClient
const fs = require('fs')
const path = require("path")
let first_setup = true

async function init() {
    let tickets_file: any = JSON.parse(fs.readFileSync('./data/tickets/ticketsetup.json', 'utf-8'))
    if(tickets_file[0] == undefined && first_setup) {
        // Prompt for initial setup when command is first used.
        consola.info('Panels system has not been set up yet.')
    }
}

init()

module.exports = {
    first_setup
}