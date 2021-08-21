const Database = require('../configs/createdb')
const Users = require('../models/Users')
module.exports = {
    async verifyUserAlreadExists(req, res, next) {
        /*const { login } = req.body
        const query = `SELECT login FROM users WHERE login = '${login}'`
        const db = await Database
        const user = await db.all(query)
        const userExists = user.some(i => i.login == login)

        if (userExists) {
            return res.status(400).json({ error: "User already exists" })
        }*/

        const { login } = req.body

        let user = await Users.find({login: login })
        
        
        if(user.length > 0){
            return res.status(400).json({ error: "User already exists" })
        }
        

        return next()

    },

    async veryfyIfUserExists(req, res, next) {
        const id = req.params

        const user = Database.then(
            async (db) => {
                await db.run(`
                select * from users where id = ${id}
                `)
            }
        )

        if (!user) {
            return res.status(404).json({ error: "User does not exists" })
        }


        return next()
    }
}