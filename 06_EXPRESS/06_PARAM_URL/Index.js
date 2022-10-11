const express = require('express')
const { networkInterfaces } = require('os')
const app = express()
const port = 2121

const path = require('path')

const basePath = path.join(__dirname, 'TEMPLATES')

app.get('/users/:id', (req, res) => {

    const id = req.params.id
    console.log(`Estamos buscando pelo usuário: ${id}`)
    res.sendFile(`${basePath}/users.html`)

})

app.get('/', (req, res) => {

    res.sendFile(`${basePath}/index.html`)

})

app.listen(port, () => {

    console.log(`App rodando na porta ${port}`)

})