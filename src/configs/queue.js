const Queue = require('bull')
const redis = require('./redis')
const salvarNotas = require('../job/salvarNotas')
const connectDB = require("../configs/database");
const dbUser = process.env.DB_USER
const dbName = process.env.DB_NAME
const dbPassword = process.env.DB_PASSWORD
connectDB(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.hk58y.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`)
const salvarNotasQueue = new Queue(salvarNotas.key, redis)

salvarNotasQueue.on('failed', (job) => {
    console.log('Job failed', job.name, job.data)
})

salvarNotasQueue.on('completed', (job)=>{
    console.log('Importação finalizada')
})


module.exports = salvarNotasQueue