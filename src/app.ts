require('dotenv').config()
import consola from "consola"
const Client = require('./lib/client')
const token = (process.env.ENVIRONMENT == "production") ? process.env.GUILDED_API_TOKEN : process.env.GUILDED_API_TESTING_TOKEN