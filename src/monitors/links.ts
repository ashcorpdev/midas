import { RESTPostChannelMessagesBody } from './../../node_modules/@guildedjs/guilded-api-typings/dist/v1/rest/Message.d';
import type { Message } from 'guilded.js'
import { Monitor } from '@guildedjs/gil'
import consola from 'consola'
const config = require('../config')
consola.info('Loaded links Monitor...')
export class LinksMonitor extends Monitor {

    async execute(message: Message): Promise<unknown> {

        let urlPattern = new RegExp(/\[([^\[]+)\](\(.*\))/gm)
        if (!message.content.match(urlPattern)) return;

        const roles = await this.client.members.getRoles(config.configuration.server_id, message.authorId);
        const exemptRoles = config.configuration.links.exempt_roles
        const hasExemption = exemptRoles.every((role: number) => roles.includes(role));
        if(hasExemption) return;
        let response: RESTPostChannelMessagesBody = {
            isPrivate: true,
            replyMessageIds: [message.id],
            content: config.configuration.lang.links.deleted_link,

        }
        message.send(response)
        this.client.messages.delete(message.channelId, message.id)
    }

    init(): unknown {
        return void 0;
    }
}

export default LinksMonitor;