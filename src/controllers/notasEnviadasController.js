const Database = require('../configs/createdb')

const controller = {}

controller.show = async(req, res) =>{
    const query = `SELECT * FROM notas_fiscais WHERE status = 'Enviada'`
    const db = await Database
    const notasEnviadas = await db.all(query)
    res.render('enviadas.html',{notasEnviadas})
}   

module.exports = controller