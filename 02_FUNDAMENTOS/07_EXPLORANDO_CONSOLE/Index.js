//mais de um valor
const x = 10
const y = 'Leo'
const z = [1, 6]

console.log(x, y, z)

//contagem de impressoes
console.count(`O valor de x é: ${x}, contagem`)
console.count(`O valor de x é: ${x}, contagem`)
console.count(`O valor de x é: ${x}, contagem`)
console.count(`O valor de x é: ${x}, contagem`)
console.count(`O valor de x é: ${x}, contagem`)
console.count(`O valor de x é: ${x}, contagem`)

//variavel entre string
console.log('Meu nome é %s', y)


//limpar console
setTimeout(() => {
    console.clear()
},2000)