const express = require('express')
const app = express()
const port = 2121

const path = require('path')

const users = require('./Users')

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// Arquivos estaticos
app.use(express.static('public'))

const basePath = path.join(__dirname, 'TEMPLATES')

app.use('/users', users)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.use(function(rq, res, next){
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})