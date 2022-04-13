import Client, { Member, Message } from "guilded.js"
const { configuration } = require('../config')
const client: Client = require('./client').guildedClient
const fs = require('fs')
const path = require("path")

async function loadModules() {
    let modules = configuration.modules.moderation.submodules

    try {
        let key: string, value: any
        for ([key, value] of Object.entries(modules)) {
            if(value.enabled) {
                console.log(`Enabled 'moderation/${key}' module.`)
                require(path.resolve(__dirname, `./moderation/${key}`))
            }
          }
          
    } catch (error) { console.log(error) }
    
}

loadModules()