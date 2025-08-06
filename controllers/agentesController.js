const { json } = require("express");
const { z } = require("zod");
const agentesRepository = require("../repositories/agentesRepository");
const {agenteSchema, idSchema, partialAgenteSchema} = require('../utils/validateAgente');

class ApiError extends Error {
    constructor(message, statusCode = 500){
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
    }
}

function getAllAgentes(req, res, next) {
    try {
        const agentes = agentesRepository.findAll();
        return res.status(200).json({ agentes: agentes});
    } catch(error) {
        next(new ApiError(error.message, 404));
    }
}

function getAgenteById(req, res, next) {
    let id;
    try {
        ({id} = idSchema.parse(req.params));
    const agente = agentesRepository.findById(id);    
    return res.status(200).json({message: "Agente encontrado com sucesso !", agente: agente});
    } catch(error) {
        next(new ApiError(error.message, 404));
    }
}

function createAgente(req,res, next){
    let agenteData;
    try {
        agenteData = agenteSchema.parse(req.body); 
    
    } catch(error) {
        return next(new ApiError(error.message, 400));
    }
    try {
        const agente = agentesRepository.create(agenteData);        
        return res.status(201).json({message: "Agente criado com sucesso !", agente: agente});
    } catch(error) {
        next(new ApiError(error.message, 404));
    }
}

function deleteAgenteById(req, res, next){
    let id;
    try {
        ({id} = idSchema.parse(req.params));
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
    try {
        deleted = agentesRepository.deleteById(id);
        return res.status(204).send();
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
}

function editAgente(req, res, next) {
    let id, dados;
    try {
        ({id} = idSchema.parse(req.params));
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
    try {
        dados = agenteSchema.parse(req.body);
    } catch(error) {
        return next(new ApiError(error.message, 400));
    }
    try {
        const agente = agentesRepository.edit(id, dados);

        return res.status(200).json({message: "Agente editado com sucesso !", agente: agente});
    } catch(error) {
        next(new ApiError(error.message, 404));
    }
}

function editAgenteProperty(req, res, next){
    let id, dados;
    try{
        ({id} = idSchema.parse(req.params));
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
    try {
        dados = partialAgenteSchema.parse(req.body);
    } catch(error) {
        return next(new ApiError(error.message, 400));
    }
    try{
        const agente = agentesRepository.editProperties(id, dados);
        return res.status(200).json({agente: agente});
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
}

module.exports = {
   getAllAgentes,
   getAgenteById,
   createAgente,
   deleteAgenteById,
   editAgente,
   editAgenteProperty
}