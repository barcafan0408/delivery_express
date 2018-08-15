const models = require('../models');
const express = require('express');
const validate = require('express-validation');
const validationRules = require('./validationRules');

const router = express.Router();// eslint-disable-line new-cap

router.post('/', validate(validationRules.routeList), (req, res) => {
  models.RouteList.create({
    date: req.body.date,
    expectingDate: req.body.expectingDate,
    actualDate: req.body.actualDate,
    idSending: req.body.idSending,
    idTransport: req.body.idTransport,
    idStorageSender: req.body.idStorageSender,
    idStorageReceiver: req.body.idStorageReceiver,
  }).then(data =>
    res.send(data));
});

router.get('/', (req, res) => {
  models.RouteList.findAll().then(data =>
    res.send(data));
});

router.get('/:id', (req, res) => {
  models.RouteList.find({
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
});

router.put('/:id', validate(validationRules.routeList), (req, res) => {
  models.RouteList.update({
    date: req.body.date,
    expectingDate: req.body.expectingDate,
    actualDate: req.body.actualDate,
    idSending: req.body.idSending,
    idTransport: req.body.idTransport,
    idStorageSender: req.body.idStorageSender,
    idStorageReceiver: req.body.idStorageReceiver,
  }, {
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
});

router.delete('/:id', (req, res) => {
  models.RouteList.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() =>
    res.sendStatus(204));
});

module.exports = router;
