const models = require('../models');
const httpStatus = require('http-status');
const _ = require('lodash');

function create(req, res) {
  models.RouteList.create(
  _.pick(req.body, ['date', 'expectingDate', 'idTransport', 'idStorageSender', 'idStorageReceiver'])
  ).then((data) => {
    req.body.sendings.map(el =>
      models.RouteListSending.create({
        idRouteList: data.get('id'),
        idSending: el.value,
      }).then(() => {
        models.Sending.update({ status: 'en_route' }, {
          where: {
            id: el.value,
          },
        });
      })
      );
    res.status(httpStatus.CREATED).json({ id: data.get('id') });
  });
}

function getAll(req, res) {
  models.RouteList.findAll({
    attributes: ['id', 'date', 'expectingDate', 'actualDate', 'idTransport', 'idStorageSender', 'idStorageReceiver'],
  }).then(data =>
    res.send(data));
}

function getById(req, res) {
  models.RouteList.find({
    attributes: ['date', 'expectingDate', 'actualDate', 'idTransport', 'idStorageSender', 'idStorageReceiver'],
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
