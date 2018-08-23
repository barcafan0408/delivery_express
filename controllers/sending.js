const models = require('../models');
const httpStatus = require('http-status');
const _ = require('lodash');

function create(req, res) {
  models.Sending.create(
    _.pick(req.body, ['date', 'number', 'status', 'idStorageSender', 'idStorageReceiver',
      'weight', 'amount', 'coment', 'idUserSender', 'idUserReceiver', 'fragile', 'cost'])
  ).then(data =>
    res.status(httpStatus.CREATED).json({ id: data.get('id') }),
  );
}

function getAll(req, res) {
  models.Sending.findAll({
    attributes: ['date', 'number', 'status', 'weight', 'amount', 'coment', 'fragile', 'cost'],
  }).then(data =>
    res.send(data));
}

function getById(req, res) {
  models.Sending.find({
    attributes: ['date', 'number', 'status', 'weight', 'amount', 'coment', 'fragile', 'cost'],
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
}

function update(req, res) {
  models.Sending.update(_.pickBy(req.body), {
    where: {
      id: req.params.id,
    },
  }).then(() =>
    res.sendStatus(httpStatus.OK));
}

function deleteById(req, res) {
  models.Sending.destroy({
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
