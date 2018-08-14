const models = require('../models');
const express = require('express');

const router = express.Router();// eslint-disable-line new-cap

router.post('/create', (req, res) => {
  models.User.create({
    name: req.body.userName,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
  }).then(data =>
    res.send(data));
});

router.get('/', (req, res) => {
  models.User.findAll().then(data =>
    res.send(data));
});

router.get('/:id', (req, res) => {
  models.User.find({
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
});

router.put('/:id', (req, res) => {
  models.User.update({
    name: req.body.userName,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
  }, {
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
});

router.delete('/:id', (req, res) => {
  models.User.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() =>
    res.sendStatus(204));
});

module.exports = router;
