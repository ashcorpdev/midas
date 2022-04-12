require('dotenv').config()
const Client = require('./lib/init')
const token = (process.env.ENVIRONMENT == "production") ? process.env.GUILDED_API_TOKEN : process.env.GUILDED_API_TESTING_TOKEN