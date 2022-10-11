const express = require('express')
const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.post('/createproduct', (req, res) => {
    const name = req.body.name
    const price = req.body.price

    console.log(name)
    console.log(price)

    if(!name)
        res.status(422).json({message: 'O nome do produto é obrigatório'})

    res.status(201).json({message : `O produto ${name} esta custando R$ ${price}`})
})

app.get('/', (req, res) => {
    res.status(200).json({message: 'Rota criada com sucesso'})
})

app.listen(3000)