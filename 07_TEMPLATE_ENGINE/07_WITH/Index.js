const express = require('express')
const exphbs = require('express-handlebars')
const port = 2121

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {

    const itens = ["A", "B", "C", "D", "E"]

    res.render("dashboard",{itens})
})

app.get('/post', (req, res) => {
    const post = {
        title : 'Aprender Node.Js',
        category : 'JavaScript',
        body : 'Aprenda com meu curso',
        comments : 4,
    }

    res.render('blogpost', {post})
})

app.get('/', (req, res) => {

    const user = {
        name : 'Leonardo',
        surname : 'Britto',
        age : '30'
    }

    const auth = true
    const approved = false

    res.render('home', {user : user, auth, approved})
})

app.listen(port, () => {
    console.log(`App usando a porta ${port}`)
})