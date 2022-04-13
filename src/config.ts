let config: any
import consola from "consola"
async function reloadConfiguration() {
    config = require('../config.json')
    module.exports.configuration = config
    consola.log('🔧 Loading configuration...')
    consola.log(`🔧 Registering bot as '${config.name}'.`)
}

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
    reloadConfiguration,
    loadModules
}