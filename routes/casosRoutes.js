const express = require('express')
const router = express.Router();
const casosController = require('../controllers/casosController');

// define a rota para /agentes usando o método GET
router.get('/casos', casosController.getAllCasos);

router.get('/casos/:id', casosController.getCasoById);

router.post('/casos', casosController.createCaso);

router.put('/casos/:id', casosController.editCaso);

router.patch('/casos/:id', casosController.editCasoProperty);

router.delete('/casos/:id', casosController.deleteCasoById);

module.exports = router