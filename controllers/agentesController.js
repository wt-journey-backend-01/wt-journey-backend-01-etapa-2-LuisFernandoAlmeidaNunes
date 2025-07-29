const { json } = require("express");
const agentesRepository = require("../repositories/agentesRepository")


function getAllAgentes(req, res) {
    const agentes = agentesRepository.findAll()
    return res.status(200).json({ agentes: agentes})
}

function getAgenteById(req, res) {
    const id = req.params.id;
    console.log(id);
    const agente = agentesRepository.findById(id);
    if (!agente) {
        return res.status(404)
    }
    return res.status(200).json({message: "Agente encontrado comsucesso !", agente: agente});
}

function createAgente(req,res){
    
    agente = agentesRepository.create(req.body);
    
    if (agente === false){
        return res.status(400).json({messsage: "Paramtros incorretos !"});
    }
    
    return res.status(201).json({messsage: "Agente criado com sucesso !", agente: agente});
}

function deleteAgenteById(req, res){

    deleted = agentesRepository.deleteById(req.params.id);
    
    if (!deleted) {
        return res.status(400).json({messsage: "não foi possível encontrar o agente !"});
    }

    return res.status(204).send();
}

function editAgente(req, res) {

    if ( !req.body.nome || !req.body.dataDeIncorporacao || !req.body.cargo ){
        res.status(400).json({ message: "Faltam parâmetros para a edição !"});
    }

    agente = agentesRepository.edit(req.params.id, req.body);

    if(!agente){
        return res.status(400).json({ messsage: "Paramêtros incorretos para o agente !"});
    }

    return res.status(200).json({messsage: "Agente editado com sucesso !", agente: agente});

}

function editAgenteProperty(req, res){

    if (!req.body.nome && !req.body.dataDeIncorporacao && !req.body.cargo) {
        return res.status(400).json({ message: "Nenhuma propriedade válida para atualização foi enviada." });
    }

    agente = agentesRepository.editProperties(req.params.id, req.body);

    if(!agente) {
        return res.status(400).json({messsage: "Erro na atualização do agente !"});
    }

    return res.status(200).json({messsage: "Agente atualizado com sucesso !", agente: agente});

}

module.exports = {
   getAllAgentes,
   getAgenteById,
   createAgente,
   deleteAgenteById,
   editAgente,
   editAgenteProperty
}