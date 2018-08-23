const express = require('express');
const validate = require('express-validation');
const validationRules = require('../config/paramValidation');
const tariffController = require('../controllers/tariff');

const router = express.Router();// eslint-disable-line new-cap

router.post('/', validate(validationRules.tariff.create), tariffController.create);

router.get('/', tariffController.getAll);

router.get('/:id', tariffController.getById);

router.put('/:id', validate(validationRules.tariff.update), tariffController.update);

router.delete('/:id', tariffController.deleteById);

module.exports = router;
