const Notasfiscais = require('../models/NotasFiscais')

module.exports = async () => {
    const resultado = await Notasfiscais.findOne().sort({ data_emissao: -1 })
    let data
    if (resultado?.data_emissao) {
                
        data = new Date(resultado.data_emissao).toLocaleString()
        let seg = Number(data.toString().split(':')[2])
        seg = seg + 1

        if (seg < 10) {
            seg = `0${seg}`
        }

        let min = data.toString().split(':')[1]
        let dia = data.toString().split(':')[0]
        data = data.toString().split(' ')[0]
        data = `${dia}:${min}:${seg}`
    } else {
        data = `${new Date().toLocaleDateString()} 01:00:00`

    }

    return data
}

