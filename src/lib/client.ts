import { BotClient } from "@guildedjs/gil";
import consola from "consola";
const { reloadConfiguration } = require("../config");

let guilded_client: BotClient;

async function init() {
  let config = await reloadConfiguration();
  if (config !== undefined) {
    if (config.environment === "development") {
      consola.warn(
        `RUNNING IN ${config.environment.toUpperCase()} ENVIRONMENT.`
      );
    } else {
      consola.success(`Running in ${config.environment} environment.`);
    }
    guilded_client = new BotClient({
      token: process.env.GUILDED_API_TOKEN!,
      prefix: process.env.COMMAND_PREFIX!,
    });
    guilded_client.on("ready", async () => {
      consola.log("\n✅ Client has started!");
    });
    module.exports.guildedClient = guilded_client;
    guilded_client.login();
  }
}

init();

module.exports = init;
