var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks')
const Queue = require('./configs/queue')
const BullBoard = require('bull-board');
const router = require('./routes/routes');
const connectDB = require("./configs/database");
const dbUser = process.env.DB_USER
const dbName = process.env.DB_NAME
const dbPassword = process.env.DB_PASSWORD
connectDB(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.hk58y.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`)
var app = express();

nunjucks.configure('src/public', {
    autoescape: true,
    express: app,
    watch: true
})



BullBoard.setQueues([new BullBoard.BullAdapter(Queue)])
app.set('view engine', '.html') 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin/queues', BullBoard.router)

app.use(router);



module.exports = app;
