const express = require('express')
const exphbs = require('express-handlebars')
const port = 2121

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {
    res.render("dashboard")
})

app.get('/', (req, res) => {

    const user = {
        name : 'Leonardo',
        surname : 'Britto',
        age : '30'
    }

    const auth = true

    res.render('home', {user : user, auth})
})

app.listen(port, () => {
    console.log(`App usando a porta ${port}`)
})