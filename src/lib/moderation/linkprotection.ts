// Checks if there are URLs present in a message.
import consola from "consola"
import Client, { Member, Message } from "guilded.js";
import fs from "fs";
const { configuration } = require("../../config");
const client: Client = require("../client").guildedClient;

var urlPattern = new RegExp(/\[([^\[]+)\](\(.*\))/gm);
client.on("messageCreated", async (message: Message) => {
  let formatted_message = message.content.toLowerCase();
  if (formatted_message.match(urlPattern)) {
    const author = message.createdById;
    const user_roles = await (
      await client.members.fetch(process.env.SERVER_ID!, author)
    ).getRoles();
    let excluded_roles: number[] = configuration.modules.moderation.submodules.linkprotection.excluded_roles
    if (!user_roles.some(item => excluded_roles.includes(item))) {
      consola.warn("Message contained only a url!");
      client.messages
        .delete(message.channelId, message.id)
        .then(async () => {
          const bot_reply = await client.messages.send(message.channelId, {
            isPrivate: true,
            replyMessageIds: [message.id],
            content: "Your message contained a url and has been deleted.",
          });
          setTimeout(function () {
            client.messages.delete(message.channelId, bot_reply.id);
          }, 30000);
        })
        .catch((err) => {
          consola.error(err);
        });
    }
  }
});
