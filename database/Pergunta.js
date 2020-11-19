const Sequelize = require('sequelize')
const connection = require('./database') 

const Pergunta = connection.define('perguntas',{
    titulo: {
        type: Sequelize.STRING, //Textos curtos
        allowNull: false //impede que esse campo receba valores nulos, nunca estará vazio

    },
    descricao: {
        type: Sequelize.TEXT, //Textos longos
        allowNull: false
    }
})
// Ele vai criar a tabela, sincronizando com o banco de dados
// force: false, não irá forçar, recriando caso exista.
Pergunta.sync({force:false}).then(()=>{

})

module.exports = Pergunta