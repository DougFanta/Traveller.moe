const mongoose = require('mongoose')
mongoose.set('bufferCommands', false)

const schema = mongoose.Schema({
    chave_acesso: {
        type: String,
        required: true
    },
    numero_nota: {
        type: Number,
        required: true
    },

    serie: {
        type: Number,
        required: true
    },

    data_emissao: {
        type: String,
        required: true
    }, 

    pedido_loja: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    conta_bling: {
        type: Number,
        required: true
    }, 

    link_danfe: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('NotasFiscais', schema, 'notas')