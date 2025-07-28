const express = require('express')
const router = express.Router();
const agentesController = require('../controllers/agentesController');

router.get('/agentes', agentesController.getAllAgentes);

router.get('/agentes/:id', agentesController.getAgenteById);

router.post('/agentes', agentesController.createAgente);

router.put('/agentes/:id', agentesController.editAgente);

router.patch('/agentes/:id', agentesController.editAgenteProperty);

router.delete('/agentes/:id', agentesController.deleteAgenteById);

module.exports = router