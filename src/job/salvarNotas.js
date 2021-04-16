
const request = require('../configs/configAxios')
const url = require('../configs/configsURL')
const Database = require('../configs/createdb')
const {consultaDb} = require('./consultaDb')
//função que faz a requisição para a api externa e retorna os dados

async function getNfs(dataInicial,apikey){
request.get(`page=${url.page}/json/&filters=dataEmissao[${dataInicial} TO ${new Date().toLocaleString()}]; ${url.situation}&${apikey}`)
.then(response =>{
    
    if(response.data.retorno.notasfiscais){
        saveData(catchData(response.data.retorno.notasfiscais))
    }
    
})
.catch(erro => console.log(erro))
      
}

function catchData(data){
    const chaveDeAcesso = data.map(i => i.notafiscal.chaveAcesso)
    const numero = data.map(i => i.notafiscal.numero)
    const serie = data.map(i => i.notafiscal.serie)
    const dataEmissao = data.map(i => i.notafiscal.dataEmissao)
    const pedidoLoja = data.map(i => i.notafiscal.numeroPedidoLoja)
    const situacao = data.map(i => i.notafiscal.situacao)
    const cnpj = chaveDeAcesso.map(i =>i.slice(6,20))
    const linkDanfe = data.map(i => i.notafiscal.linkDanfe)
        
    return {chaveDeAcesso, numero, serie, dataEmissao, pedidoLoja, situacao, cnpj, linkDanfe}
}

function saveData(dados){
    
        Database.then(async db =>{
            
            for(let i = 0; i < dados.serie.length; i++){

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
                    "${dados.chaveDeAcesso[i]}",
                    "${dados.numero[i]}",
                    "${dados.serie[i]}",
                    "${dados.dataEmissao[i]}",
                    "${dados.pedidoLoja[i]}",
                    "${dados.situacao[i]}",
                    "${dados.cnpj[i]}",
                    "${dados.linkDanfe[i]}"
                
                )`) 
                console.log(`cadastradas ${i+1} notas`)     
            }
        url.page++
        execute()
    })
    .catch(err => {console.log(err)})
    
}
async function call(data){
    Promise.all([
        await getNfs(data, url.apikey1),
        await getNfs(data, url.apikey2),
        await getNfs(data, url.apikey3)
    ])
    .then(response => console.log('Importação de notas finalizada'))
    .catch(err => console.log(err))
    
}
    

/*Função responsável por fazer a busca no banco e verificar a data e a hora mais recente, 
  caso não tenha nenhuma nota cadastrada a data utilizada é a data atual com o horário 01:00:00.
  
  Feito isso será chamada a função para obter os dados da api do bling passando as 3 chavespara serem cadastradas
*/
function execute(){
    consultaDb().then( result => {
        call(result)
    }).catch(err => {
        console.log(err)
    })    

}  

module.exports = { 
    key: "Salvar Notas", 
    handle(){  
        execute()
  }
}
