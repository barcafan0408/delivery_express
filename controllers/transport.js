const models = require('../models');

function create(req, res) {
  models.Transport.create({
    name: req.body.transportName,
    volume: req.body.volume,
    maxWeight: req.body.maxWeight,
    speed: req.body.speed,
  }).then(data =>
    res.send(data));
}

function getAll(req, res) {
  models.Transport.findAll().then(data =>
    res.send(data));
}

function getById(req, res) {
  models.Transport.find({
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
}

function update(req, res) {
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
}

function deleteById(req, res) {
  models.Transport.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() =>
    res.sendStatus(204));
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
