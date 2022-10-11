const express = require('express')
const { networkInterfaces } = require('os')
const app = express()
const port = 2121

const path = require('path')

const basePath = path.join(__dirname, 'TEMPLATES')

const checkAuth = function (req, res, next){

    req.authStatus = true 

    if(req.authStatus){
        console.log('Estou Logado')
        next()
    } else {
        console.log('Erro!')
        next()
    }

}

app.use(checkAuth)

app.get('/', (req, res) => {

    res.sendFile(`${basePath}/index.html`)

})

app.listen(port, () => {

    console.log(`App rodando na porta ${port}`)

})