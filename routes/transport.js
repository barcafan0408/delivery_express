const express = require('express');
const validate = require('express-validation');
const validationRules = require('../config/paramValidation');
const transportController = require('../controllers/transport');

const router = express.Router();// eslint-disable-line new-cap

router.post('/', validate(validationRules.transport.create), transportController.create);

router.get('/', transportController.getAll);

router.get('/:id', transportController.getById);

router.put('/:id', validate(validationRules.transport.update), transportController.update);

router.delete('/:id', transportController.deleteById);

module.exports = router;
