const express = require('express')
const app = express()
const port = 2121

app.get('/', (req, res) => {

    res.send('Ola Mundo!!')

})

app.listen(port, () => {

    console.log(`App rodando na porta ${port}`)

})