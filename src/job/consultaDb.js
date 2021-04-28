const Database = require('../configs/createdb') 

module.exports  = {async consultaDb (){ 
    let resultado = await Database
       .then( async db =>
            await db.all(`SELECT data_emissao FROM notas_fiscais ORDER BY ID DESC LIMIT 1`)
        
        )
    let data
    if(resultado.length > 0){
        data = new Date(resultado[0].data_emissao).toLocaleString() 
        let seg = Number(data.toString().split(':')[2])
        seg = seg + 1
        
        if(seg < 10){
            seg = `0${seg}`
            
        }
        
        let min = data.toString().split(':')[1]
        let dia = data.toString().split(':')[0]
        data = data.toString().split(' ')[0]
        data = `${dia}:${min}:${seg}`
    }else{
        data = `${new Date().toLocaleDateString()} 01:00:00`
        
    }

        return data
    }
}




