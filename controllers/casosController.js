const { json } = require("express");
const casosRepository = require("../repositories/casosRepository")


function getAllCasos(req, res) {
    const casos = casosRepository.findAll()
    return res.status(200).json(casos)
}

function getCasoById(req, res) {
    const id = req.params.id;
    const caso = casosRepository.findById(id);
    if (!caso) {
        return res.status(404)
    }
    return res.status(200).json(caso);
}

function createCaso(req,res){
    
    casos = casosRepository.create(req.body);
    
    if (casos === false){
        return res.status(400).json({messsage: "Paramtros incorretos !"});
    }
    
    console.log(casos);
    
    return res.status(201).json({messsage: "Caso criado com sucesso !"});
}

function deleteCasoById(req, res){

    deleted = casosRepository.deleteById(req.params.id);
    
    if (!deleted) {
        return res.status(400).json({messsage: "não foi possível encontrar o caso !"});
    }

    return res.status(200).json({ messsage: "Caso deletado com sucesso !"});
}

function editCaso(req, res) {

    caso = casosRepository.edit(req.params.id, req.body);

    if(!caso){
        return res.status(400).json({ messsage: "Paramêtros incorretos para o caso !"});
    }

    return res.status(200).json({messsage: "Caso editado com sucesso !", caso: caso});

}

function editCasoProperty(req, res){

    if (!req.body.titulo && !req.body.descricao && !req.body.status && !req.body.agente_id) {
        return res.status(400).json({ message: "Nenhuma propriedade válida para atualização foi enviada." });
    }

    caso = casosRepository.editProperties(req.params.id, req.body);

    if(!caso) {
        return res.status(400).json({messsage: "Erro na atualização do caso !"});
    }

    return res.status(200).json({messsage: "Caso atualizado com sucesso !", caso: caso});

}

module.exports = {
   getAllCasos,
   getCasoById,
   createCaso,
   deleteCasoById,
   editCaso,
   editCasoProperty
}