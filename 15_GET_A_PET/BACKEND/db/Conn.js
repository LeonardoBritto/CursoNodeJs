const mongoose = require('mongoose')

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/getapet')
    console.log('Conectado ao Banco com Sucesso')
}

main().catch((err) => console.log(err))

module.exports = mongoose