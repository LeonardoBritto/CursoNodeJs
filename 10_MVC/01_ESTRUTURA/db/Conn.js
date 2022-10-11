const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodemvc', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectado com Sucesso!')
} catch (error) {
    console.log(error)
}