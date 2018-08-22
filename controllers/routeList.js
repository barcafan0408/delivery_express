const models = require('../models');

function create(req, res) {
  models.RouteList.create({
    date: req.body.date,
    expectingDate: req.body.expectingDate,
    actualDate: req.body.actualDate,
    idSending: req.body.idSending,
    idTransport: req.body.idTransport,
    idStorageSender: req.body.idStorageSender,
    idStorageReceiver: req.body.idStorageReceiver,
  }).then(data =>
    res.send(data));
}

function getAll(req, res) {
  models.RouteList.findAll().then(data =>
    res.send(data));
}

function getById(req, res) {
  models.RouteList.find({
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
}

function update(req, res) {
  models.RouteList.update({
    date: req.body.date,
    expectingDate: req.body.expectingDate,
    actualDate: req.body.actualDate,
    idSending: req.body.idSending,
    idTransport: req.body.idTransport,
    idStorageSender: req.body.idStorageSender,
    idStorageReceiver: req.body.idStorageReceiver,
  }, {
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
}

function deleteById(req, res) {
  models.RouteList.destroy({
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
