let config: any

async function reloadConfiguration() {
    config = require('../config.json')
    module.exports.configuration = config
    console.log('Loaded configuration.')
    console.log(`Registering bot as '${config.name}'.`)
}

async function loadModules() {
    let modules = config.modules

    try {
        let key: string, value: any
        for ([key, value] of Object.entries(modules)) {
            if(value.enabled) {
                console.log(`Enabled '${key}' module.`)
                require(`./lib/${key}`)
            }
          }
          
    } catch (error) { console.log(error) }
    
}

module.exports = {
    reloadConfiguration,
    loadModules
}