const mysql = require('mysql2')

const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodemysql',
})

module.exports = pool