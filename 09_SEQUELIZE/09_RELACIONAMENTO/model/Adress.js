const { DataTypes } = require('sequelize')
const db = require('../db/Conn')
const User = require('./User')

const Address = db.define('Adrress', {
    street : {
        type: DataTypes.STRING,
        require: true,
    },
    number : {
        type: DataTypes.STRING,
        require: true,
    },
    city : {
        type: DataTypes.STRING,
        require: true,
    },
})

Address.belongsTo(User)

module.exports = Address