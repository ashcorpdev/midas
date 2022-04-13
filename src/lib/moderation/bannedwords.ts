import Client, { Member, Message } from "guilded.js";
import consola from "consola";
import fs from "fs";
const { configuration } = require("../../config");
const client: Client = require("../client").guildedClient;
const banned_words = fs.readFileSync(
  `./data/moderation/${configuration.modules.moderation.submodules.bannedwords.words_list}`,
  "utf-8"
);
let array = banned_words.split(/\r?\n/);
client.on("messageCreated", async (message: Message) => {
  let msg = message.content.toLowerCase();
  const roles = await (
    await client.members.fetch(process.env.SERVER_ID!, message.createdById)
  ).getRoles();
  let excluded_roles: number[] =
    configuration.modules.moderation.submodules.linkprotection.excluded_roles;
  if (!roles.some((item) => excluded_roles.includes(item))) {
    if (array.some((substring) => msg.includes(substring))) {
      consola.warn("Message contained a banned word!");
      client.messages
        .delete(message.channelId, message.id)
        .then(async () => {
          const reply = await client.messages.send(message.channelId, {
            isPrivate: true,
            replyMessageIds: [message.id],
            content:
              "Your message contained a banned word and has been deleted.",
          });
          setTimeout(function () {
            client.messages.delete(message.channelId, reply.id);
          }, 30000);
        })
        .catch((err) => {
          consola.error(err);
        });
    }
  }
});

client.on("messageCreated", async (message: Message) => {
  if (
    configuration.modules.commands.enabled &&
    message.content.startsWith(
      configuration.modules.commands.prefix + "bannedwords"
    )
  ) {
    let args: string[] = message.content.split(" ");
    switch (args[1]) {
      case "add":
        // Add banned word to list
        if (args[2] !== undefined || null) {
          consola.info(`Adding '${args[2]}' to banned words list.`);
          client.messages.send(
            message.channelId,
            `Adding '${args[2]}' to banned words list.`
          );
          let words = fs.readFileSync(
            `./data/moderation/${configuration.modules.moderation.submodules.bannedwords.words_list}`,
            "utf-8"
          );
          let array: string[] = words.split(/\r?\n/);
          if (!array.includes(args[2])) {
            array.push(args[2]);
            consola.info(
              `Added new word '${args[2]}' to the banned words list.`
            );
            let newWords = array.join("\n");
            fs.writeFileSync(
              `./data/moderation/${configuration.modules.moderation.submodules.bannedwords.words_list}`,
              newWords
            );
          }
        }
        break;
      case "remove":
        // Remove banned word from list
        if (args[2] !== undefined || null) {
          consola.info(`Removing '${args[2]}' from banned words list.`);
          client.messages.send(
            message.channelId,
            `Removing '${args[2]}' from banned words list.`
          );
          let words = fs.readFileSync(
            `./data/moderation/${configuration.modules.moderation.submodules.bannedwords.words_list}`,
            "utf-8"
          );
          let array: string[] = words.split(/\r?\n/);
          if (array.includes(args[2])) {
            array.push(args[2]);
            let filter = array.filter((word) => word !== args[2]);
            consola.info(
              `Removed new word '${args[2]}' from the banned words list.`
            );
            let newWords = filter.join("\n");
            fs.writeFileSync(
              `./data/moderation/${configuration.modules.moderation.submodules.bannedwords.words_list}`,
              newWords
            );
          }
        }
        break;
      default:
        break;
    }
  }
});
