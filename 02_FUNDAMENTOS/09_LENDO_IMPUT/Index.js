const readLine = require('readline').createInterface({
    input : process.stdin,
    output : process.stdout,
})

readLine.question('Qual sua idade?', (age) => {
    console.log(`Minha idade é ${age}`)
    readLine.close()
})

