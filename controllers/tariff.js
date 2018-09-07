const models = require('../models');
const httpStatus = require('http-status');
const _ = require('lodash');

function create(req, res) {
  models.Tariff.create(
    _.pick(req.body, ['date', 'idStorageSender', 'idStorageReceiver', 'minWeight', 'maxWeight', 'fragile', 'price'])
  ).then(data =>
    res.status(httpStatus.CREATED).json({ id: data.get('id') }),
  );
}

function getAll(req, res) {
  models.Tariff.findAll({
    attributes: ['id', 'date', 'idStorageSender', 'idStorageReceiver', 'minWeight', 'maxWeight', 'fragile', 'price'],
  }).then(data =>
    res.send(data));
}

function getById(req, res) {
  models.Tariff.find({
    attributes: ['date', 'idStorageSender', 'idStorageReceiver', 'minWeight', 'maxWeight', 'fragile', 'price'],
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
}

function update(req, res) {
  models.Tariff.update(_.pickBy(req.body), {
    where: {
      id: req.params.id,
    },
  }).then(() =>
    res.sendStatus(httpStatus.OK));
}

function deleteById(req, res) {
  models.Tariff.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() =>
    res.sendStatus(httpStatus.NO_CONTENT));
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
