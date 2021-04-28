const Database = require('../configs/createdb')
const Queue = require('../configs/queue')
const controller = {}

controller.show = async (req, res) =>{
    const query = `SELECT * FROM notas_fiscais WHERE status <> 'Enviada' ORDER BY id`
    try{
        const db = await Database
        const notas = await db.all(query)
        return res.render('notas.html', {notas})
    }catch(erro){
        console.log(erro)
        return res.sendStatus(500).end
    }
}


controller.getOne = async(req, res) => {
    const query = `SELECT * FROM notas_fiscais WHERE id = ${req.params.id}`
    const db = await Database
    const notas = await db.all(query)
    res.render('notas.html',{notas}).sendStatus(200)
}

controller.create = async(req, res) =>{
        
    try{
        await Queue.add()
        res.redirect('notas')
        
    }catch(erro){
        console.log(erro)
        res.sendStatus(500).end
    }
}

controller.update = async(req, res) =>{
    try{
        const numNota = req.body.numero
        
        let query = `UPDATE notas_fiscais SET status = 'Enviada' 
                     WHERE numero_nota = '${numNota}'`
        
        Database.then(async db =>{
            await db.run(query)
        })
        res.redirect('/atualizar')
    }catch(erro){
        console.log(erro)
    }
}

module.exports = controller