
const dotenv = require('dotenv')
dotenv.config({path: './configs/.env'})
console.log("Queue on")
const Queue = require('./configs/queue')
const salvarNotasQueue = require('./job/salvarNotas')

Queue.process(salvarNotasQueue.handle)
