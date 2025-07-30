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
    return casos.find( caso => caso.id === id);
}

function findByAgente(id){
    casos.forEach(caso => {
        if (caso.agente_id === id ){
            return caso;
        }
        return null;
    });
}

function create(dataCaso){

        console.log(dataCaso);
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

    return false;
}


function edit(id, casoData){
    
    casoToEditIndex = casos.findIndex(caso => caso.id === id);

    if(casoToEditIndex === -1) {
        return false;
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
    return true;
}

  return false;
}

module.exports = {
    findAll,
    findById,
    findByAgente,
    create,
    edit,
    deleteById,
    editProperties
}