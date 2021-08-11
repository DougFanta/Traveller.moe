var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks')
const Queue = require('./configs/queue')
const BullBoard = require('bull-board');
const router = require('./routes/routes');


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
