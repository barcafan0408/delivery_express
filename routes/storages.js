const models = require('../models');
const express = require('express');
const validate = require('express-validation');
const validationRules = require('./validationRules');

const router = express.Router();// eslint-disable-line new-cap

router.post('/', validate(validationRules.storage), (req, res) => {
  models.Storage.create({
    name: req.body.storageName,
    country: req.body.country,
    region: req.body.region,
    city: req.body.city,
    street: req.body.street,
    house: req.body.house,
    storageType: req.body.storageType,
  }).then(data =>
    res.send(data));
});

router.get('/', (req, res) => {
  models.Storage.findAll().then(data =>
    res.send(data));
});

router.get('/:id', (req, res) => {
  models.Storage.find({
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
});

router.put('/:id', validate(validationRules.storage), (req, res) => {
  models.Storage.update({
    name: req.body.storageName,
    country: req.body.country,
    region: req.body.region,
    city: req.body.city,
    street: req.body.street,
    house: req.body.house,
    storageType: req.body.storageType,
  }, {
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
});

router.delete('/:id', (req, res) => {
  models.Storage.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() =>
    res.sendStatus(204));
});

module.exports = router;
