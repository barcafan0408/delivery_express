const models = require('../models');
const express = require('express');
const validate = require('express-validation');
const validationRules = require('./validationRules');

const router = express.Router();// eslint-disable-line new-cap

router.post('/', validate(validationRules.tariff), (req, res) => {
  models.Tariff.create({
    date: req.body.date,
    idStorageSender: req.body.idStorageSender,
    idStorageReceiver: req.body.idStorageReceiver,
    minWeight: req.body.minWeight,
    maxWeight: req.body.maxWeight,
    fragile: req.body.fragile,
    price: req.body.price,
  }).then(data =>
    res.send(data));
});

router.get('/', (req, res) => {
  models.Tariff.findAll().then(data =>
    res.send(data));
});

router.get('/:id', (req, res) => {
  models.Tariff.find({
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
});

router.put('/:id', validate(validationRules.tariff), (req, res) => {
  models.Tariff.update({
    date: req.body.date,
    idStorageSender: req.body.idStorageSender,
    idStorageReceiver: req.body.idStorageReceiver,
    minWeight: req.body.minWeight,
    maxWeight: req.body.maxWeight,
    fragile: req.body.fragile,
    price: req.body.price,
  }, {
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
});

router.delete('/:id', (req, res) => {
  models.Tariff.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() =>
    res.sendStatus(204));
});

module.exports = router;
