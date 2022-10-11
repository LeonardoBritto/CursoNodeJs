const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')
const port = 2121

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

app.post('/books/insert', (req, res) => {
    const title = req.body.title
    const pages = req.body.pages

    const query = `INSERT INTO books (title, pages) VALUES ('${title}', '${pages}')`

    conn.query(query, function(err) {
        if(err)
            console.log(err)
        
        res.redirect('/books')
    })
})

app.get('/books', (req, res) => {
    const sql = "SELECT * FROM books"

    conn.query(sql, function(err, data) {
        if(err){
            console.log(err)
            return
        }

        const books = data
        console.log(books)

        res.render('books', {books})
    })
})

app.get('/book/:id', (req, res) => {
    const id = req.params.id
    const select = `SELECT * FROM books WHERE id = ${id}`

    conn.query(select, function(err, data) {
        if(err){
            console.log(err)
            return
        }

        const book = data[0]
        console.log(book)

        res.render('book', {book})
    })
})

app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id
    const select = `SELECT * FROM books WHERE id = ${id}`
    
    conn.query(select, function(err, data) {
        if(err){
            console.log(err)
            return
        }

        const book = data[0]
        console.log(book)

        res.render('editbook', {book})
    })
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