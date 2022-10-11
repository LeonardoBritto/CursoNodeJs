const express = require('express')
const exphbs = require('express-handlebars')
const port = 2121

const app = express()

const hbs = exphbs.create({
    partialsDir : ["views/partials"]
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

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

app.get('/blog', (req, res) => {
    const posts = [{
        title : 'Aprender Node.Js',
        category : 'JavaScript',
        body : 'Aprenda com meu curso em Node.Js',
        comments : 4,
    },
    {
        title : 'Aprender PHP',
        category : 'PHP',
        body : 'Aprenda com meu curso em PHP',
        comments : 8,    
    },
    {
        title : 'Aprender .Net',
        category : '.Net',
        body : 'Aprenda com meu curso em .Net',
        comments : 9,
    }]

    res.render('blog', {posts})
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