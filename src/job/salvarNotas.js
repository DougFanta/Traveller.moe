
const request = require('../configs/configAxios')
const url = require('../configs/configsURL')
const Database = require('../configs/createdb')
const {consultaDb} = require('./consultaDb')
//função que faz a requisição para a api externa e retorna os dados

async function execute(){
    const result = await consultaDb()

    async function call(data){
        Promise.all([
            //await getNfs(data, url.apikey1),
            await getNfs(data, url.apikey2),
            await getNfs(data, url.apikey3)
        ])
        .then(response => console.log('Importação de notas finalizada'))
        .catch(err => console.log(err))
        
    }

    call(result)    

    async function getNfs(dataInicial,apikey){
    request.get(`page=${url.page}/json/&filters=dataEmissao[${dataInicial} TO ${new Date().toLocaleString()}]; ${url.situation}&${apikey}`)
    .then(response =>{

        if(response.data.retorno.notasfiscais){
            saveData(response.data.retorno.notasfiscais)
        }

    })
    .catch(erro => console.log(erro))

    }


    function saveData(dados){

            Database.then(async db =>{

                for(let i in dados){

                    await db.run(`
                    INSERT INTO notas_fiscais(
                        cave_acesso,
                        numero_nota,
                        serie,
                        data_emissao,
                        pedido_loja,
                        status,
                        conta_bling,
                        link_danfe
                    ) VALUES(
                        "${dados[i].notafiscal.chaveAcesso}",
                        "${dados[i].notafiscal.numero}",
                        "${dados[i].notafiscal.serie}",
                        "${dados[i].notafiscal.dataEmissao}",
                        "${dados[i].notafiscal.numeroPedidoLoja}",
                        "${dados[i].notafiscal.situacao}",
                        "${dados[i].notafiscal.chaveAcesso.slice(6,20)}",
                        "${dados[i].notafiscal.linkDanfe}"
                    
                    )`) 
                    console.log(`importadas ${Number(i)+1} notas`)
                }
            url.page++
            
            call(result)
        })
        .catch(err => {console.log(err)})

    }

}
module.exports = { 
    key: "Salvar Notas", 
    handle(){  
        execute()
  }
}
