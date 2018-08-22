const express = require('express');
const validate = require('express-validation');
const validationRules = require('../config/paramValidation');
const storageController = require('../controllers/storage');

const router = express.Router();// eslint-disable-line new-cap

router.post('/', validate(validationRules.storage), storageController.create);

router.get('/', storageController.getAll);

router.get('/:id', storageController.getById);

router.put('/:id', validate(validationRules.storage), storageController.update);

router.delete('/:id', storageController.deleteById);

module.exports = router;
