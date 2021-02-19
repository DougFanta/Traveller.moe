const Queue = require('bull')
const redis = require('./redis')
const {setQueues, BullAdapter} = require('bull-board')
const salvarNotas = require('../job/salvarNotas')

const salvarNotasQueue = new Queue(salvarNotas.key, redis)
setQueues([new BullAdapter(salvarNotasQueue)])
salvarNotasQueue.on('failed', (job) =>{
    console.log('Job failed', job.name, job.data)
})

module.exports = salvarNotasQueue