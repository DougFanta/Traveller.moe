const NotasFiscais = require('../models/NotasFiscais')

const controller = {}

controller.show = async(req, res) =>{
    
    const notasEnviadas = await NotasFiscais.find({status:"Enviado"})

    res.render('enviadas.html',{notasEnviadas})
}   

module.exports = controller