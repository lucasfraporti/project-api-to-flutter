const express = require('express');
const userController = require('../controller/user');
const router = express.Router();

router.post('/', userController.validarUser);
router.post('/recoverpassword', userController.recoverPassword);

module.exports = router;