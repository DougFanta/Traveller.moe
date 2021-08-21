const Database = require('../configs/createdb')
const Queue = require('../configs/queue')
const NotasFiscais = require('../models/NotasFiscais')
const controller = {}

controller.show = async (req, res) => {

    try {

        const notas = await (await NotasFiscais.find()).filter(notas => notas.status !== 'Enviado')
        return res.render('notas.html', { notas })
    } catch (erro) {
        console.log(erro)
        return res.sendStatus(500).end
    }
}


controller.getOne = async (req, res) => {
    const notaId = req.params.id

    const nota = await NotasFiscais.findOne(notaId)
    res.render('notas.html', { nota }).sendStatus(200)
}

controller.create = async (req, res) => {

    try {
        await Queue.add()
        res.redirect('notas')

    } catch (erro) {
        console.log(erro)
        res.sendStatus(500).end
    }
}

controller.update = async (req, res) => {
    try {
        const numNota = req.body.numero
        await NotasFiscais.findOneAndUpdate({numero_nota:numNota}, { status: "Enviado" })
        res.redirect('/atualizar')
    } catch (erro) {
        console.log(erro)
    }
}

module.exports = controller