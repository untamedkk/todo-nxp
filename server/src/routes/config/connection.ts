const dotenv = require("dotenv").config()
const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: process.env.DB_MAX_POOL_SIZE,
    idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT
})

module.exports = pool