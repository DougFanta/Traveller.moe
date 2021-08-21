const mongoose = require('mongoose')

const schema = mongoose.Schema({
    login: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    
    created_at: {
        type: Date,
        required: true
    },

    canceled_at: {
        type: Date
    },

    role: {
        type: String,
        enum: ['admin', 'financeiro', 'expedição'],
        required: true
    },

    status: {
        type: String,
        enum: ['Ativo', 'Inativo']
    }

})

module.exports = mongoose.model('Users', schema, 'users')