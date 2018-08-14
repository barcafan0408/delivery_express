const models = require('../models');
const express = require('express');

const router = express.Router();// eslint-disable-line new-cap

router.post('/create', (req, res) => {
  models.Transport.create({
    name: req.body.transportName,
    volume: req.body.volume,
    maxWeight: req.body.maxWeight,
    speed: req.body.speed,
  }).then(data =>
    res.send(data));
});

router.get('/', (req, res) => {
  models.Transport.findAll().then(data =>
    res.send(data));
});

router.get('/:id', (req, res) => {
  models.Transport.find({
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
});

router.put('/:id', (req, res) => {
  models.Transport.update({
    name: req.body.transportName,
    volume: req.body.volume,
    maxWeight: req.body.maxWeight,
    speed: req.body.speed,
  }, {
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
});

router.delete('/:id', (req, res) => {
  models.Transport.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() =>
    res.sendStatus(204));
});

module.exports = router;
