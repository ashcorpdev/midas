import Client, { Member, Message } from "guilded.js"
import consola from "consola"
const { configuration } = require('../../config')
const client: Client = require('../client').guildedClient
const fs = require('fs')
const path = require("path")