const { json } = require("express");
const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");
const {idSchema, casoSchema, partialCasoSchema} = require('../utils/validateCaso');
const { z } = require("zod");

class ApiError extends Error {
    constructor(message, statusCode = 500){
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
    }
}

function getAllCasos(req, res, next) {

    const {agente_id, status} = req.query;

    try {
        let casos = casosRepository.findAll();

        if(agente_id){
            const validatedUuid = idSchema.parse({id: agente_id});
            const agenteExists = agentesRepository.findById(validatedUuid.id);
            const casos = casosRepository.findByAgente(agenteExists.id);
            if(casos){
                return res.status(200).json({casos: casos});
            }
        }
        
        if(status){
            if(status === "aberto" || status === "solucionado" ){
                casos = casos.filter(caso => caso.status === status);
            } else {
                return next(new ApiError('Apenas é possível pesquisar por "aberto" ou "solucionado"', 400));
            }
        }

        return res.status(200).json(casos);
        
    } catch(error) {
        return next(new ApiError(error.message, 400));
    }
}

function getCasosByWord(req, res, next){
    const {q} = req.query;

    console.log(q);
    
    if (!q) {
        return next(new ApiError("Parâmetro 'q' é obrigatório para busca.", 400));
    }

    const casos = casosRepository.findByWord(q);
    
    return res.status(200).json({casos: casos});
}

// function getCasoByAgente(id, res, next) {

//     const agenteExists = agentesRepository.findById(id);

//     if(!agenteExists){
//         return next(new ApiError(error.message, 404));
//     }

//     try {
//         const caso = casosRepository.findByAgente(id);
//         return res.status(200).json(caso);
//     } catch(error) {
//         return next(new ApiError(error.message, 404));
//     }
// }

function getAgenteDataByCasoId(req, res, next){
    const { caso_id } = req.params;
    let validCasoId;
    try {
        validCasoId = idSchema.parse({ id: caso_id });
    } catch(error) {
        return next(new ApiError(error.message, 400));
    }

    let caso;
    try {
        caso = casosRepository.findById(validCasoId.id);
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }

    try {
        const agente = agentesRepository.findById(caso.agente_id);
        return res.status(200).json({ agente });
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
}

// function getCasoAberto(status, casos, res, next){

//     if (status !== "aberto"){
//         return next(new ApiError('O filtro deve ocorrer por "Aberto"', 400));
//     }

//     if (!Array.isArray(casos)) {
//         throw new Error(error.message, 400);
//     }

//     const casosAbertos = casosRepository.findAberto(casos);    

//     return res.status(200).json(casosAbertos);

// }

function getCasoById(req, res, next) {
    let id;
    try {
        ({id} = idSchema.parse(req.params));
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
    
    try {
        const caso = casosRepository.findById(id);
        return res.status(200).json(caso);
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
}


function createCaso(req, res, next){
    let dados;
    try {
        dados = casoSchema.parse(req.body);
    } catch(error) {
        return next(new ApiError(error.message, 400));
    }
    try {
        agentesRepository.findById(dados.agente_id);
    } catch (error) {
        return next(new ApiError(`Agente com id ${dados.agente_id} não encontrado`, 404));
    }
    try {
        const caso = casosRepository.create(dados);
        return res.status(201).json({caso: caso});
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
}

function deleteCasoById(req, res, next){
    let id;
    try {
        ({id} = idSchema.parse(req.params));
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
    
    try {
        casosRepository.deleteById(id);
        return res.status(204).send();
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
}

function editCaso(req, res, next) {
    let id, dados;
    try{
        ({id} = idSchema.parse(req.params));
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
    try {
        dados = casoSchema.parse(req.body);
    } catch(error) {
        return next(new ApiError(error.message, 400));
    }

    try {
    const caso = casosRepository.edit(id, dados);
    return res.status(200).json({message: "Caso editado com sucesso !", caso: caso});
    }  catch(error) {
        return next(new ApiError(error.message, 404));
    }

}

function editCasoProperty(req, res, next){
    let id, dados;
    
    try {
        ({id} = idSchema.parse(req.params));
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
    
    try {
        dados = partialCasoSchema.parse(req.body);
    } catch(error) {
        return next(new ApiError(error.message, 400));
    }

    if (Object.keys(dados).length === 0) {
        return res.status(400).json({ message: "Nenhuma propriedade foi enviada." });
    }

    try {
    const caso = casosRepository.editProperties(id, dados);

    return res.status(200).json({message: "Caso atualizado com sucesso !", caso: caso});
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
}

module.exports = {
   getAllCasos,
   getCasoById,
//    getCasoByAgente,
   getAgenteDataByCasoId,
//    getCasoAberto,
   getCasosByWord,
   createCaso,
   deleteCasoById,
   editCaso,
   editCasoProperty
}