import Client, { Member, Message } from "guilded.js"
import consola from "consola"
import { BotClient } from "@guildedjs/gil"
const { configuration } = require('../config')
const client: BotClient = require('./client').guildedClient
const fs = require('fs')
const path = require("path")

async function loadSubmodules() {
    consola.log('🔧 Loading moderation submodules...')
    let modules = configuration.modules.moderation.submodules

    try {
        let key: string, value: any
        for ([key, value] of Object.entries(modules)) {
            if(value.enabled) {
                consola.log(`🧩 Enabled 'moderation/${key}' submodule.`)
                require(path.resolve(__dirname, `./moderation/${key}`))
            }
          }
          
    } catch (error) { consola.error(error) }
    
}

loadSubmodules()