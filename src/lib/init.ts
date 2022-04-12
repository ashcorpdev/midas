async function init() {
  const { Client } = require("guilded.js")
  const client = new Client({ token: process.env.GUILDED_API_TOKEN })
  client.on("ready", async () => {
    console.log("Client is ready!")
    console.log(`Running in ${process.env.ENVIRONMENT} environment.`)
  });
  client.login()
}

module.exports = init()
