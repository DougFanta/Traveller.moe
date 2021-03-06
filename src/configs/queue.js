const Queue = require('bull')
const redis = require('./redis')
const salvarNotas = require('../job/salvarNotas')

const salvarNotasQueue = new Queue(salvarNotas.key, redis)

salvarNotasQueue.on('failed', (job) =>{
    console.log('Job failed', job.name, job.data)
})


module.exports = salvarNotasQueue