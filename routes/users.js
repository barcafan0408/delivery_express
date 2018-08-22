const express = require('express');
const validate = require('express-validation');
const validationRules = require('../config/paramValidation');
const userController = require('../controllers/user');

const router = express.Router();// eslint-disable-line new-cap

router.post('/', validate(validationRules.user), userController.create);

router.get('/', userController.getAll);

router.get('/:id', userController.getById);

router.put('/:id', validate(validationRules.user), userController.update);

router.delete('/:id', userController.deleteById);

module.exports = router;
