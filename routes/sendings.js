const models = require('../models');
const express = require('express');

const router = express.Router();// eslint-disable-line new-cap

router.post('/create', (req, res) => {
  models.Sending.create({
    date: req.body.date,
    number: req.body.number,
    status: req.body.status,
    idStorageSender: req.body.idStorageSender,
    idStorageReceiver: req.body.idStorageReceiver,
    weight: req.body.weight,
    amount: req.body.amount,
    coment: req.body.coment,
    idUserSender: req.body.idUserSender,
    idUserReceiver: req.body.idUserReceiver,
    fragile: req.body.fragile,
    cost: req.body.cost,
  }).then(data =>
    res.send(data));
});

router.get('/', (req, res) => {
  models.Sending.findAll().then(data =>
    res.send(data));
});

router.get('/:id', (req, res) => {
  models.Sending.find({
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
});

router.put('/:id', (req, res) => {
  models.Sending.update({
    date: req.body.date,
    number: req.body.number,
    status: req.body.status,
    idStorageSender: req.body.idStorageSender,
    idStorageReceiver: req.body.idStorageReceiver,
    weight: req.body.weight,
    amount: req.body.amount,
    coment: req.body.coment,
    idUserSender: req.body.idUserSender,
    idUserReceiver: req.body.idUserReceiver,
    fragile: req.body.fragile,
    cost: req.body.cost,
  }, {
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
});

router.delete('/:id', (req, res) => {
  models.Sending.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() =>
    res.sendStatus(204));
});

module.exports = router;
