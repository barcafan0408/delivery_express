const express = require('express');
const validate = require('express-validation');
const validationRules = require('../config/paramValidation');
const routeListController = require('../controllers/routeList');

const router = express.Router();// eslint-disable-line new-cap

router.post('/', validate(validationRules.routeList), routeListController.create);

router.get('/', routeListController.getAll);

router.get('/:id', routeListController.getById);

router.put('/:id', validate(validationRules.routeList), routeListController.update);

router.delete('/:id', routeListController.deleteById);

module.exports = router;
