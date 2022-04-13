import Client from "guilded.js";

let guildedClient: Client

async function init() {
  require('../config').reloadConfiguration().then(() => {
    console.log(`Running in ${process.env.ENVIRONMENT} environment.`)
    const { Client } = require("guilded.js")
    guildedClient = new Client({ token: process.env.GUILDED_API_TOKEN })
    guildedClient.on("ready", async () => {
      console.log("Client is ready!")
      require('../config').loadModules()
    });
    module.exports.guildedClient = guildedClient;
    guildedClient.login()
  }).catch((err: Error) => {
    console.log(`Error loading client: ${err}`)
  });

}
init()

module.exports = {
  init
}
