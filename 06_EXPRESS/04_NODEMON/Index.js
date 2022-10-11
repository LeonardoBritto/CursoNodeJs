const express = require('express')
const app = express()
const port = 2121

const path = require('path')

const basePath = path.join(__dirname, 'TEMPLATES')

app.get('/', (req, res) => {

    res.sendFile(`${basePath}/index.html`)

})

app.listen(port, () => {

    console.log(`App rodando na porta ${port}`)

})