const Database = require('../configs/createdb')
const {v4: uuidv4} = require('uuid')
const {createHash} = require('../utils/hashBilder')
const controller = {}

controller.create = async(req, res) =>{
    const {login, password, role} = req.body
    if(!login){
        return res.status(400).json({error: "you must inform the login"})
    }
    if(!password){
        return res.status(400).json({error: "you must inform the password"})
    }

    if(!role){
        return res.status(400).json({error: "you must inform the role"})
    }
    const id = uuidv4()

    const encriptedPsw = createHash(password)
    const payload = {
        id,
        login,
        created_at: new Date().toISOString(),
        role,
        situacao: "activated"

    }
    const query = `INSERT INTO users(
        id,
        login,
        senha,
        data_criacao,
        role,
        situacao
    ) VALUES(
        "${payload.id}",
        "${payload.login}",
        "${encriptedPsw}",
        "${payload.created_at}",
        "${payload.role}",
        "${payload.situacao}"
    )`

    const db = await Database
    const user = await db.all(query)

    return res.status(201).json(payload)
    
}

controller.edit = async (req, res) =>{
    const id = req.params

    const user = Database.then(
        async(db) =>{
            await db.run(`
                select * from users where id = ${id}
            `)
        }
    )
    
    if(!user){
        return res.status(404).json({error: "User does not exists"})
    }


}

module.exports = controller