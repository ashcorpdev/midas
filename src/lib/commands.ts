const fs = require('fs')
const path = require("path")
const files = fs.readdirSync(path.resolve(__dirname, `./commands`)).filter((file: string) => file.endsWith('.js'));
console.log('Loading commands...')
for (const file of files) {
	require(`./commands/${file}`);
}

module.exports = {}