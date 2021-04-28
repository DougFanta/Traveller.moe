const crypto = require("crypto")
module.exports = {
    createHash(password){
        const hash = crypto.createHash('sha256')
        const encriptedPassword = hash.update(password).digest('hex')

        return encriptedPassword
    }
}