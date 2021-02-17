
const { response } = require('express')
const request = require('../configs/configAxios')
const url = require('../configs/configsURL')
const Database = require('../configs/createdb')
const {consultaDb} = require('./consultaDb')
//função que faz a requisição para a api externa e retorna os dados

/*
    */
    async function getNfs(dataInicial,apikey){
    request.get(`page=${url.page}/json/&filters=dataEmissao[${dataInicial} TO ${new Date().toLocaleString()}]; ${url.situation}&${apikey}`)
    .then(response =>{
        if(response.data.retorno.notasfiscais){
            saveData(catchData(response.data.retorno.notasfiscais))
        }else{
            console.log('Não há notas a serem cadastradas')
        }
        
    })
    .catch(erro => console.log(erro))
      
}

function catchData(data){
    const serie = []
    const numero = []
    const pedidoLoja = []
    const dataEmissao = []
    const situacao = [] 
    let cnpj = []
    for(let i = 0; i < data.length; i++){
        serie.push(data[i].notafiscal.serie)
        numero.push(data[i].notafiscal.numero)
        pedidoLoja.push(data[i].notafiscal.numeroPedidoLoja)
        dataEmissao.push(data[i].notafiscal.dataEmissao)
        situacao.push(data[i].notafiscal.situacao)
        cnpj.push(data[i].notafiscal.chaveAcesso)
    }
    cnpj = cnpj.map(i =>i.slice(6,20))
        
    return {serie, numero, pedidoLoja, dataEmissao, situacao, cnpj}
}

function saveData(dados){
        Database.then(async db =>{
            for(let i = 0; i < dados.serie.length; i++){

                await db.run(`
                INSERT INTO notas_fiscais(
                    serie,
                    numero,
                    pedido_loja,
                    data_emissao,
                    status,
                    conta_bling
                ) VALUES(
                    "${dados.serie[i]}",
                    "${dados.numero[i]}",
                    "${dados.pedidoLoja[i]}",
                    "${dados.dataEmissao[i]}",
                    "${dados.situacao[i]}",
                    "${dados.cnpj[i]}"
                
                )`) 
                console.log(`cadastradas ${i+1} notas`)     
            }
        url.page++
        execute()
    })
    .catch(err => {console.log(err)})
    
}
async function call(data){
    
    await getNfs(data, url.apikey1)
    await getNfs(data, url.apikey2)
    await getNfs(data, url.apikey3)
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
    async handle(){  
          await execute()
  }
}
