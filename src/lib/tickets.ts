import Client, { Member, Message } from "guilded.js"
import consola from "consola"
const { configuration } = require('../config')
const client: Client = require('./client').guildedClient
const fs = require('fs')
const path = require("path")
const panelbuilder = require('./tickets/panelbuilder')
let first_setup = true

//TODO: Implement tickets
//      - Setup command to auto-generate channels/categories - panelbuilder.ts
//          - If panels.json is empty, assume first-time setup when tickets command is run
//      - Read from panels.json file to create the actual panels
//      - Handle emoji reactions to create tickets etc
//      - Provide a transcript to a specific channel

async function init() {
    let panels_file: any = JSON.parse(fs.readFileSync('./data/tickets/panels.json', 'utf-8'))
    if(panels_file[0] == undefined && first_setup) {
        // Prompt for initial setup when command is first used.
        consola.info('Panels system has not been set up yet.')
    }
}

init()

module.exports = {
    first_setup
}