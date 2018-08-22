const models = require('../models');

function create(req, res) {
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
}

function getAll(req, res) {
  models.Storage.findAll().then(data =>
    res.send(data));
}

function getById(req, res) {
  models.Storage.find({
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
}

function update(req, res) {
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
}

function deleteById(req, res) {
  models.Storage.destroy({
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
