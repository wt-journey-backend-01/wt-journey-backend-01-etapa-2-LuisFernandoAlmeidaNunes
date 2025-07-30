const crypto = require('crypto');

const agentes = [
    {
    "id": "401bccf5-cf9e-489d-8412-446cd169a0f1",
    "nome": "Rommel Carneiro",
    "dataDeIncorporacao": "1992/10/04",
    "cargo": "delegado"

    },
]

function findAll(){
    return agentes;
}

function findById(id){
    const agente = agentes.find(agente => agente.id === id)
    if (!agente){
        throw new Error(`Id ${id} não encontrado !`);
    }
    return agente;
}


function create(dataAgente){

    const len = agentes.length;

    const {nome, dataDeIncorporacao, cargo} = dataAgente;

    agente = {};
    agente.id = crypto.randomUUID();
    agente.nome = nome;
    agente.dataDeIncorporacao = dataDeIncorporacao;
    agente.cargo = cargo;
    
    agentes.push(agente);

    if (agentes.length === len){
        throw new Error(`Não foi possível adicionar agente !`);
    }
    
    return agente;

}


function edit(id, agenteData){
    
    agenteToEditIndex = agentes.findIndex(agente => agente.id === id);

    if(agenteToEditIndex === -1) {
        throw new Error(`Id ${id} não encontrado !`);
    }

    agentes[agenteToEditIndex].id = id;
    agentes[agenteToEditIndex].nome = agenteData.nome;
    agentes[agenteToEditIndex].dataDeIncorporacao = agenteData.dataDeIncorporacao;
    agentes[agenteToEditIndex].cargo = agenteData.cargo;

    return agentes[agenteToEditIndex];

}

function editProperties(id, dataForPatch){
    
    indexAgente = agentes.findIndex(agente => agente.id === id)
    
    if ( indexAgente === -1){
        throw new Error(`Id ${id} não encontrado !`);
    }

    const {nome, dataDeIncorporacao, cargo} = dataForPatch;
    
    if ( nome !== undefined && nome !== "") agentes[indexAgente].nome = nome;
    if ( dataDeIncorporacao !== undefined && dataDeIncorporacao !== "") agentes[indexAgente].dataDeIncorporacao = dataDeIncorporacao;
    if ( cargo !== undefined && cargo !== "") agentes[indexAgente].cargo = cargo;

    return agentes[indexAgente]

}

function deleteById(id) {
  const index = agentes.findIndex(agente => agente.id === id);

  if (index === -1) {
    agente = agentes.splice(index, 1);
    return agente;
    }
    
    throw new Error(`Id ${id} não encontrado !`);
}

module.exports = {
    findAll,
    findById,
    create,
    edit,
    deleteById,
    editProperties
}