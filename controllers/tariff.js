const models = require('../models');
const db = require('../models');
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
  const query = 'SELECT Tariffs.id, date, idStorageSender, idStorageReceiver, minWeight, maxWeight, fragile, price, ' +
                'storageSender.name as storageSenderName, storageReceiver.name as storageReceiverName FROM delivery_db.Tariffs ' +
                'LEFT JOIN delivery_db.Storages as storageSender ON Tariffs.idStorageSender = storageSender.id ' +
                'LEFT JOIN delivery_db.Storages as storageReceiver ON Tariffs.idStorageReceiver = storageReceiver.id ' +
                'WHERE Tariffs.removeDate is null';
  db.sequelize.query(query,
    {
      type: db.sequelize.QueryTypes.SELECT,
    })
    .then(data =>
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

function getPrice(req, res) {
  models.Tariff.findAll({
    attributes: ['id', 'price'],
    where: {
      date: {
        $lte: new Date(),
      },
      idStorageSender: req.query.idStorageSender,
      idStorageReceiver: req.query.idStorageReceiver,
      minWeight: {
        $lte: req.query.weight,
      },
      maxWeight: {
        $gte: req.query.weight,
      },
      fragile: req.query.fragile === 'true',
    },
    order: [
      ['date', 'DESC'],
    ],
    limit: 1,
  }).then(data =>
    res.send(data));
}

function update(req, res) {
  models.Tariff.update(req.body, {
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
  getPrice,
  update,
  deleteById,
};
