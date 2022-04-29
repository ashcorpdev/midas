import { RESTPostChannelMessagesBody } from "./../../node_modules/@guildedjs/guilded-api-typings/dist/v1/rest/Message.d";
import type { Message } from "guilded.js";
import { Monitor } from "@guildedjs/gil";
import consola from "consola";
const config = require("../config");
consola.info("Loaded links Monitor...");
export class LinksMonitor extends Monitor {
  async execute(message: Message): Promise<unknown> {
    let urlPattern = new RegExp(/\[([^\[]+)\](\(.*\))/gm);
    if (!message.content.match(urlPattern)) return;
    let matched = message.content.replace(/\[([^\]]+)\][^\)]+\)/g, "$1"); // This strips the markdown formatting off of the link and outputs just the raw text.
    let domain = matched.match(/([^\/,\s]+\.[^\/,\s]+?)(?=\/|,|\s|$|\?|#)/g)
    const roles = await this.client.members.getRoles(
      config.configuration.server_id,
      message.authorId
    );
    const exemptRoles = config.configuration.links.exempt_roles;
    const hasExemption = exemptRoles.every((role: number) =>
      roles.includes(role)
    );
    if (hasExemption) {
      const bannedLinks: Array<String> = config.configuration.links.banned_links;
      const isBannedLink = bannedLinks.every((link: any) => domain?.includes(link))
      consola.info(domain, bannedLinks)
      if (isBannedLink) {
        consola.warn('Link posted with banned domain:', domain)
        let response: RESTPostChannelMessagesBody = {
          isPrivate: true,
          replyMessageIds: [message.id],
          content: config.configuration.lang.links.banned_link,
        };
        message.send(response);
        this.client.messages.delete(message.channelId, message.id);
        return
      }
      return
    }
    let response: RESTPostChannelMessagesBody = {
      isPrivate: true,
      replyMessageIds: [message.id],
      content: config.configuration.lang.links.deleted_link,
    };
    message.send(response);
    this.client.messages.delete(message.channelId, message.id);
  }

  init(): unknown {
    return void 0;
  }
}

export default LinksMonitor;
