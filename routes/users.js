const express = require('express');
const validate = require('express-validation');
const validationRules = require('../config/paramValidation');
const userController = require('../controllers/user');

const router = express.Router();// eslint-disable-line new-cap

router.post('/', validate(validationRules.user.create), userController.create);

router.get('/', validate(validationRules.user.getAll), userController.getAll);

router.get('/phone/:phone', userController.getByPhone);

router.get('/:id', userController.getById);

router.put('/:id', validate(validationRules.user.update), userController.update);

router.delete('/:id', userController.deleteById);

module.exports = router;
