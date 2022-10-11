const express = require('express')
const exphbs = require('express-handlebars')
const ports = 2121

const app = express()

const conn = require('./db/Conn')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use(express.static('public'))

app.listen(ports)
