const express = require('express');
const validate = require('express-validation');
const validationRules = require('../config/paramValidation');
const sendingController = require('../controllers/sending');

const router = express.Router();// eslint-disable-line new-cap

router.post('/', validate(validationRules.sending.create), sendingController.create);

router.get('/', sendingController.getAll);

router.get('/betweenStorages', sendingController.getbetweenStorages);

router.get('/number/:number', sendingController.getByNumber);

router.get('/:id', sendingController.getById);

router.put('/:id', validate(validationRules.sending.update), sendingController.update);

router.delete('/:id', sendingController.deleteById);

module.exports = router;
