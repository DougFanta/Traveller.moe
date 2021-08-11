require('dotenv').config({ path: '.env' })

module.exports = {
    page: 1,
    situation: 'situacao[7]',
    apikey1: process.env.API_KEY1,
    apikey2: process.env.API_KEY2,
    apikey3: process.env.API_KEY3
}