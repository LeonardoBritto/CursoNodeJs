const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/Conn')
const port = 2121

const User = require('./model/User')

const app = express()

app.use(express.urlencoded({
    extended: true,
}))

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

conn.sync().then(() => {
    app.listen(port)
}).catch((err) => console.log(err))