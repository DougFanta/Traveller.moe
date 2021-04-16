const Database = require('sqlite-async')

function execute(db){
    //criar as tabelas do db
  return  db.exec(`
        CREATE TABLE IF NOT EXISTS notas_fiscais (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cave_acesso TEXT,
            numero_nota TEXT,
            serie TEXT,
            data_emissao TEXT,
            pedido_loja TEXT,
            status TEXT,
            conta_bling TEXT,
            link_danfe TEXT  
        );

        CREATE TABLE IF NOT EXISTS users(
            id TEXT PRIMARY KEY,
            login TEXT,
            senha TEXT,
            data_criacao INTEGER,
            data_cancelamento TEXT,
            role TEXT,
            situacao TEXT
        );
    `)
}


module.exports = Database.open(__dirname+'/database.sqlite').then(execute)