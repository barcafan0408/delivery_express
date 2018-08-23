const models = require('../models');
const httpStatus = require('http-status');
const _ = require('lodash');

function create(req, res) {
  models.RouteList.create(
  _.pick(req.body, ['date', 'expectingDate', 'actualDate', 'idSending', 'idTransport', 'idStorageSender', 'idStorageReceiver'])
  ).then(data =>
    res.status(httpStatus.CREATED).json({ id: data.get('id') }),
  );
}

function getAll(req, res) {
  models.RouteList.findAll({
    attributes: ['date', 'expectingDate', 'actualDate', 'idSending', 'idTransport', 'idStorageSender', 'idStorageReceiver'],
  }).then(data =>
    res.send(data));
}

function getById(req, res) {
  models.RouteList.find({
    attributes: ['date', 'expectingDate', 'actualDate', 'idSending', 'idTransport', 'idStorageSender', 'idStorageReceiver'],
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
}

function update(req, res) {
  models.RouteList.update(_.pickBy(req.body), {
    where: {
      id: req.params.id,
    },
  }).then(() =>
    res.sendStatus(httpStatus.OK));
}

function deleteById(req, res) {
  models.RouteList.destroy({
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
