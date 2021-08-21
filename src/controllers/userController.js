const {createHash} = require('../utils/hashBilder')
const Users = require('../models/Users')
const controller = {}


controller.edit = async (req, res) =>{
    const id = req.params

    try {
        const user = await Users.findByIdAndUpdate(id, req.body)
        if(!user){
            return res.status(404).json({error: "User does not exists"})
        }

    }catch(erro){
        console.log(erro)
    } 
    
}

controller.create = async(req, res) => {
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
    
    const encriptedPsw = createHash(password)
    const payload = {
        login,
        password: encriptedPsw,
        created_at: new Date().toISOString(),
        role,
        situacao: "activated"
    }

    try {
        await Users.create(payload)
        res.status(201).json(payload)
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }

}

module.exports = controller