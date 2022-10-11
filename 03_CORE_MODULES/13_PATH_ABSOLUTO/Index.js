const path = require('path')

//path absluto
console.log(path.resolve('Arq.txt'))

//formar path
const midFolder = 'Relatorios'
const fileName = 'Compras.pdf'

const finalPatch = path.join('/','Arquivos', midFolder, fileName)

console.log(finalPatch)