import Client from "guilded.js"
import consola from "consola"

let guilded_client: Client

async function init() {
  require('../config').reloadConfiguration().then(() => {
    if(process.env.ENVIRONMENT === 'development') {
      
    consola.warn(`RUNNING IN ${process.env.ENVIRONMENT.toUpperCase()} ENVIRONMENT.`)
    } else {
      consola.success(`Running in ${process.env.ENVIRONMENT} environment.`)
    }
    const { Client } = require("guilded.js")
    guilded_client = new Client({ token: process.env.GUILDED_API_TOKEN })
    guilded_client.on("ready", async () => {
      consola.success("Client has started!")
      require('../config').loadModules()
    })
    module.exports.guildedClient = guilded_client
    guilded_client.login()
  }).catch((err: Error) => consola.error(`Error loading client: ${err}`))

}
init()

module.exports = init
