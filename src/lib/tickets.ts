import Client, { Member, Message } from "guilded.js"
import consola from "consola"
const { configuration } = require('../config')
const client: Client = require('./client').guildedClient
const fs = require('fs')
const path = require("path")


//TODO: Implement tickets
//      - Setup command to auto-generate channels/categories - panelbuilder.ts
//          - If panels.json is empty, assume first-time setup when tickets command is run
//      - Read from panels.json file to create the actual panels
//      - Handle emoji reactions to create tickets etc
//      - Provide a transcript to a specific channel