const models = require('../models');

function create(req, res) {
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
}

function getAll(req, res) {
  models.Tariff.findAll().then(data =>
    res.send(data));
}

function getById(req, res) {
  models.Tariff.find({
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
}

function update(req, res) {
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
}

function deleteById(req, res) {
  models.Tariff.destroy({
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
