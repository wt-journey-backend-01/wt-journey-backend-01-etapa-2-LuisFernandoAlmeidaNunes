const crypto = require('crypto');

const casos = [
    {
        id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
        titulo: "homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1" 
    
    },
]

function findAll() {
    return casos;
}

function findById(id){
    const caso = casos.find( caso => caso.id === id);
    if (caso === undefined){
        throw new Error(`Id ${id} não encontrado !`);
    } 
    return caso;
}

function findByAgente(id){
    casosComAgente = casos.filter( caso => caso.agente_id === id);
    console.log(casosComAgente);
    if (casosComAgente.length === 0){
        throw new Error(`Casos com id ${id} não encontrados !`);
    }
    return casosComAgente;
}

function findAberto(casos) {
    
    if (!Array.isArray(casos)) {
        throw new Error("A entrada 'casos' deve ser um array.");
    }
    
    return casos.filter(caso => caso.status === "aberto");

}

function findByWord(word){

    const term = word.q.toLowerCase();

    return findAll().filter( caso => caso.titulo.toLowerCase().includes(term) || 
                                      caso.descricao.toLowerCase().includes(term));

}

function create(dataCaso){

    const len = casos.length;

    const {titulo, descricao, status, agente_id } = dataCaso;

    caso = {};
    caso.id = crypto.randomUUID();
    if (titulo !== undefined) caso.titulo = titulo;
    caso.descricao = descricao;
    caso.status = status;
    caso.agente_id = agente_id;
    
    casos.push(caso);

    if (casos.length > len){
        return caso;
    }

    throw new Error('Não foi possível criar caso !');
}


function edit(id, casoData){
    
    casoToEditIndex = casos.findIndex(caso => caso.id === id);

    if(casoToEditIndex === -1) {
        throw new Error(`Id ${id} não encontrado !`);
    }

    casos[casoToEditIndex].id = id;
    casos[casoToEditIndex].titulo = casoData.titulo;
    casos[casoToEditIndex].descricao = casoData.descricao;
    casos[casoToEditIndex].status = casoData.status;
    casos[casoToEditIndex].agente_id = casoData.agente_id;

    return casos[casoToEditIndex];

}

function editProperties(id, dataForPatch){
    
    const indexCaso = casos.findIndex(caso => caso.id === id)
    
    if( indexCaso === -1 ){
        throw new Error(`Id ${id} não encontrado !`);
    }

    const {titulo, descricao, status, agente_id } = dataForPatch;
    
    if ( titulo !== undefined) casos[indexCaso].titulo = titulo;
    if ( descricao !== undefined) casos[indexCaso].descricao = descricao;
    if ( status !== undefined) casos[indexCaso].status = status;
    if ( agente_id !== undefined) casos[indexCaso].agente_id = agente_id;

    return casos[indexCaso];

}

function deleteById(id) {
    const index = casos.findIndex(caso => caso.id === id);

    if (index !== -1) {
        casos.splice(index, 1);
    }
    
    throw new Error(`Id ${id} não encontrado !`);;
}

module.exports = {
    findAll,
    findById,
    findByAgente,
    findAberto,
    findByWord,
    create,
    edit,
    deleteById,
    editProperties
}