//modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

//modulo interno
const fs = require('fs')

operation()

function operation() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        mensagem: 'O que você deseja fazer?',
        choices: [
            'Criar Conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Sair'],
        },
]).then((answer) => {
    const action = answer['action']

    if(action == 'Criar Conta')
        createAccount()   
    else if(action == 'Consultar Saldo'){
        getAccountBalance()
    }
    else if(action == 'Depositar')
        deposit()
    else if(action == 'Sacar')
        withdraw()
    else if(action == 'Sair'){
        console.log(chalk.bgBlue.black('Obrigado por usar nosso sistema!'))
        process.exit()
    }

}).catch((err) => console.log(err))
}

//create an account
function createAccount() {
    console.log(chalk.bgGreen.black('Seja Bem-Vindo ao Nubank'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))

    buildAccount();
}

function buildAccount() {

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para sua conta:'
        }
    ]).then((answer) => {

        const accountName = answer['accountName']
        console.info(accountName)

        if(!fs.existsSync('accounts'))
            fs.mkdirSync('accounts')
        
        if(fs.existsSync(`accounts/${accountName}.json`))
        {
            console.log(chalk.bgRed.black('Esta conta ja existe, escolha outro nome!'))
            buildAccount();
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function(err){
            console.log(err)
        },
        )

        console.log(chalk.green('Parabéns, sua conta foi criada!'))
        operation()
    }).catch((err) => console.log(err))
}

function deposit(){

    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da conta para depósito?'
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName']
        if(!checkAccount(accountName)){
            return deposit
        }

        inquirer.prompt([{
            name: 'amout',
            message: 'Qual o valor do depósito?'
            }
        ])
        .then((answer) => {
            const amout = answer['amout']
                addAmout(accountName, amout)
                operation();
        }).catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
}

function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('Essa conta não existe'))
        return operation()
    }

    return true
}

function addAmout(accountName, amout){

    const accountData = getAccount(accountName)

    if(!amout){
        console.log(chalk.bgRed.black('Ocorreu um erro'))
        return deposit()
    }

    accountData.balance = parseFloat(amout) + parseFloat(accountData.balance)

    fs.writeFileSync(`accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function(err){
        console.log(err)
        },
    )

    console.log(chalk.green(`Foi depositado o valor de $${amout}, na sua conta!`))
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding:  'utf-8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}

function getAccountBalance(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Nome da conta?'
        }
    ]).then((answer) => {
        
        const accountName = answer['accountName']

        if(!getAccount(accountName))
            return getAccountBalance()

        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(`Saldo da conta:$${accountData.balance}`))

        operation()        
    }).catch((err) => console.log(err))
}

function withdraw() {

    inquirer.prompt([{
        name : 'accountName',
        message : 'Qual o nome da conta'
        }
    ]).then((answer) => {

        const accountName = answer['accountName']

        if(!getAccount(accountName))
            withdraw()

        inquirer.prompt([{
            name : 'amount',
            message : 'Quanto voce deseja sacar?'
            }
        ]).then((answer) => {

            const amount = answer['amount']

            removeAmount(accountName, amount)
        }).catch((err) => console.log(err))
    }).catch((err) => console.log(err))
}

function removeAmount(accountName, amount) {

    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente!'))
        return withdraw()
    }
    
    if(accountData.balance < amount){
        console.log(chalk.bgRed.black('Conta sem saldo suficiente!'))
        return withdraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(`accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err){
            console.log(err)
        })

    console.log(chalk.green(`Foi feito um depósito de $${amount} na sua conta!`))
    operation()
}