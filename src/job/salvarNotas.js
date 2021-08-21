
const request = require('../configs/configAxios')
const url = require('../configs/configsURL')
const consultaDb  = require('./consultaDb')
const NotasFiscais = require('../models/NotasFiscais')

//função que faz a requisição para a api externa e retorna os dados

async function execute() {
    const result = await consultaDb()
    
    async function call(data) {
        Promise.all([
            //await getNfs(data, url.apikey1),
            //await getNfs(data, url.apikey2),
            await getNfs(data, url.apikey3)
        ])
    }

    async function getNfs(dataInicial, apikey) {
        request.get(`page=${url.page}/json/&filters=dataEmissao[${dataInicial} TO ${new Date().toLocaleString()}]; ${url.situation}&${apikey}`)
            .then(async response => {
                
                if (response.data.retorno.notasfiscais) {
                   await saveData(response.data.retorno.notasfiscais)
                }
                else{
                    return
                }

            })
            .catch(erro => {
                if (erro.response.status === 403 || erro.response.status === 401) {
                    console.log(`Api Key ${apikey} Desatualizada, favor entrar em contato com o Admin`)
                }
            })

    }


    async function saveData(dados) {
       
        const notas = dados.map(i => {
            return {
                chave_acesso: i.notafiscal.chaveAcesso,
                numero_nota: i.notafiscal.numero,
                serie: i.notafiscal.serie,
                data_emissao: i.notafiscal.dataEmissao,
                pedido_loja: i.notafiscal.numeroPedidoLoja,
                status: i.notafiscal.situacao,
                conta_bling: i.notafiscal.chaveAcesso.slice(6, 20),
                link_danfe: i.notafiscal.linkDanfe
            }
        })

        try {     
            await NotasFiscais.create(notas).then(()=> {
                url.page++

                call(result)
            })
            
        } catch (erro) {
            console.log(erro)
        }

    }

    call(result)
}
module.exports = {
    key: "Salvar Notas",
    handle() {
        execute()
    }
}
