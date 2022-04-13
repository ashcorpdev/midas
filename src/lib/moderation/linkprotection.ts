// Checks if there are URLs present in a message.
import Client, { Member, Message } from "guilded.js";
import fs from "fs";
const { configuration } = require("../../config");
const client: Client = require("../client").guildedClient;

var urlPattern = new RegExp(/\[([^\[]+)\](\(.*\))/gm);
client.on("messageCreated", async (message: Message) => {
  let msg = message.content.toLowerCase();
  if (msg.match(urlPattern)) {
    let matched = msg.match(urlPattern);
    const author = message.createdById;
    const roles = await (
      await client.members.fetch(process.env.SERVER_ID!, author)
    ).getRoles();
    if (configuration.modules.moderation.excluded_roles.some((role: number)=>roles.includes(role))) {
      console.log("Message contained only a url!");
      client.messages
        .delete(message.channelId, message.id)
        .then(async () => {
          const reply = await client.messages.send(message.channelId, {
            isPrivate: true,
            replyMessageIds: [message.id],
            content: "Your message contained a url and has been deleted.",
          });
          setTimeout(function () {
            client.messages.delete(message.channelId, reply.id);
          }, 30000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});
