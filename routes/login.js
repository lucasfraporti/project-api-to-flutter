const express = require('express');
const userController = require('../controller/user');
const router = express.Router();

router.post('/', userController.validarUser);
router.put('/changepassword/:id', userController.changePassword);

module.exports = router;