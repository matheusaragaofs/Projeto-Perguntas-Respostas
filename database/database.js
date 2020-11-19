const Sequelize = require('sequelize')
const connection =  new Sequelize ('guiaperguntas','root','senha',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection
