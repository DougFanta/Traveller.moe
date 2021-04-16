const Database = require('../configs/createdb')
const {v4: uuidv4} = require('uuid')
const crypto = require("crypto")
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
   const secret = password
   const hash = crypto.createHash('sha256', secret).digest('hex')
   console.log(hash)
   
    const query = `INSERT INTO users(
        id,
        login,
        senha,
        data_criacao,
        role,
        situacao
    ) VALUES(
        "${id}",
        "${login}",
        "${hash}",
        "${new Date().toISOString()}",
        "${role}",
        "activeted"
    )`

    const db = await Database
    const user = await db.all(query)

    return res.status(201).json({massage: "User created"})
    
}

module.exports = controller