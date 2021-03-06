const Database = require('sqlite-async')

function execute(db){
    //criar as tabelas do db
  return  db.exec(`
        CREATE TABLE IF NOT EXISTS notas_fiscais (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            serie TEXT,
            numero TEXT,
            pedido_loja TEXT,
            data_emissao TEXT,
            status TEXT,
            conta_bling TEXT
        );
    `)
}


module.exports = Database.open(__dirname+'/database.sqlite').then(execute)