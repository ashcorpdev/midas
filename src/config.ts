let config: any
import consola from "consola"

async function reloadConfiguration(): Promise<any> {
    try {
    consola.log('🔧 Loading configuration...')
    config = require('../config.json')
    consola.log(`🔧 Registering bot as '${config.lang.bot_name}'.`)
    module.exports.configuration = config
    return config
    } catch (error) {
        return undefined
    }
}

/**
 * @deprecated The method should not be used
 */
async function loadModules() {
    consola.log('🔧 Loading modules...')
    let modules = config.modules

    try {
        let key: string, value: any
        for ([key, value] of Object.entries(modules)) {
            if(value.enabled) {
                consola.log(`🧩 Enabled '${key}' module.`)
                require(`./lib/${key}`)
            }
          }
          
    } catch (error) { consola.log(error) }

    consola.start('Configuration complete. Midas is active.')
    
}

module.exports = {
    reloadConfiguration
}