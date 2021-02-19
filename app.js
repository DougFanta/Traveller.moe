const dotenv = require('dotenv')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Database = require('./configs/createdb')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const nunjucks = require('nunjucks')
const Queue = require('./configs/queue')
const BullBoard = require('bull-board')


var app = express();


dotenv.config({path: './configs/.env'})

nunjucks.configure('public',{
    autoescape: true,
    express: app,
    watch: true
})

BullBoard.setQueues([new BullBoard.BullAdapter(Queue)])
app.set('view engine', '.html')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/admin/queues', BullBoard.router)
app.use('/users', usersRouter);
app.get('/notas', async function notasFiscais(req, res){
    const query = `SELECT * FROM notas_fiscais WHERE status <> 'Enviada' ORDER BY id`
    try{
        const db = await Database
        const notas = await db.all(query)
        return res.render('notas.html', {notas})
    }catch(erro){
        console.log(erro)
        return res.sendStatus(500).end
    }
})

app.get('/notas/:id', async(req, res) => {
    const query = `SELECT * FROM notas_fiscais WHERE id = ${req.params.id}`
    const db = await Database
    const notas = await db.all(query)
    res.render('notas.html',{notas}).sendStatus(200)
  })
  
app.post('/notas', async function requisicao(req, res){
        
    try{
        await Queue.add()
        res.redirect('notas')
        
    }catch(erro){
        console.log(erro)
        res.sendStatus(500).end
    }
})

app.post('/atualizar', async(req, res) =>{
    try{
        const numNota = req.body.numero
        
        let query = `UPDATE notas_fiscais SET status = 'Enviada' 
                     WHERE numero = '${numNota}'`
        
        Database.then(async db =>{
            await db.run(query)
        })
        res.redirect('/atualizar')
    }catch(erro){
        console.log(erro)
    }
})

app.get('/atualizar', (req, res) =>{
    res.render('atualizar.html')
})

app.get('/enviadas', async(req, res) =>{
    const query = `SELECT * FROM notas_fiscais WHERE status = 'Enviada'`
    const db = await Database
    const notasEnviadas = await db.all(query)
    res.render('enviadas.html',{notasEnviadas})
})

module.exports = app;
