const fs = require('fs')

if(!fs.existsSync('./MeuProjeto')){
    console.log('Não Existe')
}

fs.mkdirSync('MeuProjeto')

if(fs.existsSync('./MeuProjeto')){
    console.log('Existe')
}