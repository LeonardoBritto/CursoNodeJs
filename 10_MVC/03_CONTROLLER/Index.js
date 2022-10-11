const express = require('express')
const exphbs = require('express-handlebars')
const ports = 2121

const app = express()

const conn = require('./db/Conn')

const Task = require('./model/Task')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use(express.static('public'))

conn.sync().then(() => {
    app.listen(ports)
}).catch((err) => console.log(err))
