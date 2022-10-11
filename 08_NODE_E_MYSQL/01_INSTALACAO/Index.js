const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')
const port = 2121

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodemysql',
})

conn.connect(function(err) {
    if(err)
        console.log(err)

    console.log('Conexão com o Banco MySQL estabalecido!')

    app.listen(port)
})