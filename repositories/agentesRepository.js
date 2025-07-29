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
    return agentes.find(agente => agente.id === id);
}


function create(dataAgente){

    const len = agentes.length;

    const {nome, dataDeIncorporacao, cargo} = dataAgente;
    
    if ( nome === undefined ||  dataDeIncorporacao === undefined || cargo  === undefined) return false;

    agente = {};
    agente.id = crypto.randomUUID();
    agente.nome = nome;
    agente.dataDeIncorporacao = dataDeIncorporacao;
    agente.cargo = cargo;
    
    agentes.push(agente);

    if (agentes.length > len){
        return agentes;
    }

    return false;
}


function edit(id, agenteData){
    
    agenteToEditIndex = agentes.findIndex(agente => agente.id === id);

    if(agenteToEditIndex === -1) {
        return false;
    }

    agentes[agenteToEditIndex].id = id;
    agentes[agenteToEditIndex].nome = agenteData.nome;
    agentes[agenteToEditIndex].dataDeIncorporacao = agenteData.dataDeIncorporacao;
    agentes[agenteToEditIndex].cargo = agenteData.cargo;

    return agentes[agenteToEditIndex];

}

function editProperties(id, dataForPatch){
    
    indexAgente = agentes.findIndex(agente => agente.id === id)
    
    const {nome, dataDeIncorporacao, cargo} = dataForPatch;
    
    if ( nome !== undefined && nome !== "") agentes[indexAgente].nome = nome;
    if ( dataDeIncorporacao !== undefined && dataDeIncorporacao !== "") agentes[indexAgente].dataDeIncorporacao = dataDeIncorporacao;
    if ( cargo !== undefined && cargo !== "") agentes[indexAgente].cargo = cargo;

    return agentes[indexAgente]

}

function deleteById(id) {
  const index = agentes.findIndex(agente => agente.id === id);

  if (index !== -1) {
    agente = agentes.splice(index, 1);
    return agente;
}

  return false;
}

module.exports = {
    findAll,
    findById,
    create,
    edit,
    deleteById,
    editProperties
}