const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { json } = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const { reset } = require('nodemon')
const Resposta = require('./database/Resposta')



// Vai fazer a autenticação, que retornará uma promise
connection.authenticate().then(()=>{
console.log('Conexão feita com o banco de dados')    
}).catch((err)=>{
 console.log(err)
})


//Ambiente
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



//Estou dizendo para o express usar o EJS como view engine
app.set('view engine','ejs')
app.use(express.static('public'))


//Rotas

app.get('/',(req,res)=>{
    Pergunta.findAll({raw: true, order:[['id','DESC']]}).then((perguntas)=>{
        console.log(perguntas)
    res.render('index',{
        perguntas:perguntas
    });
    })
})

app.get('/pergunta/:id',(req,res)=>{
    const { id } = req.params

     Pergunta.findOne({where:{
        id:id
    }}).then((pergunta)=>{
        if (pergunta != undefined) {

            Resposta.findAll({where:{
                perguntaID: pergunta.id,
            },order:[['id','DESC']]
            }).then((respostas)=>{
                
            res.render('pergunta',{
                pergunta: pergunta,
                respostas: respostas
            })
            })
        } else {
            res.redirect("/")
        }
    })
})

app.get('/perguntar',(req,res)=>{
    res.render('perguntar')
})


app.post('/salvarpergunta',(req,res)=>{
    const { titulo, descricao } = req.body
    Pergunta.create({
        titulo:titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect('/')
    })
})

app.post('/responder',(req,res)=>{
    const { corpo, perguntaID} = req.body
    Resposta.create({
        corpo:corpo,
        perguntaID:perguntaID
    }).then(()=>{
        res.redirect('/pergunta/'+perguntaID)
    })
})


app.listen(8080, ()=>{
    console.log('App funcionando')
})