const axios = require('axios')

module.exports = axios.create({
    baseURL: 'https://bling.com.br/Api/v2/notasfiscais/'
})