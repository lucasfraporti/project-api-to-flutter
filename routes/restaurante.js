const express = require('express');
const restauranteController = require('../controller/restaurante');
const router = express.Router();

router.get('/', restauranteController.getAll);
router.get('/:id', restauranteController.getMesaById);
router.get('/mesa/:numberMesa', restauranteController.getMesaByNumber);
router.get('/atendente/search', restauranteController.getAtendente);
router.get('/cliente/search', restauranteController.getCliente);
router.get('/limpeza/search', restauranteController.getLimpeza);
router.get('/status/search', restauranteController.getStatus);
router.get('/verificar/disponibilidade', restauranteController.getAvailability);
router.put('/:id', restauranteController.attMesa);
router.post('/', restauranteController.postMesa);
router.delete('/:id', restauranteController.deleteMesa);

module.exports = router;