const { default: mongoose } = require('mongoose')
const monoose = require('mongoose')
const url = "mongodb://localhost:27017/testemongoose"

async function main(){
    await monoose.connect(url)
    console.log('Banco conectado ao Mongoose')
}

main().catch((err) => console.log(err))

module.exports = mongoose