const express = require('express');
const userController = require('../controller/user');
const router = express.Router();

router.get('/', userController.listarUsers);
router.get('/search', userController.buscarUser);
router.get('/:id', userController.listarUsersById);
router.post('/', userController.postUser);
router.put('/:id', userController.attUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;