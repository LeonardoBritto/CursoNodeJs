const { Sequelize } = require('sequelize')

                                //BANCO - USUARIO - SENHA
const sequelize = new Sequelize('sequelize', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

try {

    sequelize.authenticate()
    console.log('Conectado com sucesso ao banco Sequelize!')

} catch (err) {
    console.log('Não foi possivel conectar: ', error)
}

module.exports = sequelize