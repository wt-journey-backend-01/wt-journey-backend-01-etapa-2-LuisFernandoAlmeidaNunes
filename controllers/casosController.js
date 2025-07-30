const { json } = require("express");
const casosRepository = require("../repositories/casosRepository");
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
    try {
        const casos = casosRepository.findAll();
        return res.status(200).json(casos);
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
}

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
        console.log(dados);
    } catch(error) {
        return next(new ApiError(error.message, 400));
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
        deleted = casosRepository.deleteById(id);
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
    caso = casosRepository.edit(id, dados);
    return res.status(200).json({messsage: "Caso editado com sucesso !", caso: caso});
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
    caso = casosRepository.editProperties(id, dados);

    return res.status(200).json({messsage: "Caso atualizado com sucesso !", caso: caso});
    } catch(error) {
        return next(new ApiError(error.message, 404));
    }
}

module.exports = {
   getAllCasos,
   getCasoById,
   createCaso,
   deleteCasoById,
   editCaso,
   editCasoProperty
}