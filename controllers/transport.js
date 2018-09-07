const models = require('../models');
const httpStatus = require('http-status');

function create(req, res) {
  models.Transport.create({
    name: req.body.transportName,
    volume: req.body.volume,
    maxWeight: req.body.maxWeight,
    speed: req.body.speed,
  }).then(data =>
    res.status(httpStatus.CREATED).json({ id: data.get('id') }),
  );
}

function getAll(req, res) {
  models.Transport.findAll({
    attributes: ['id', 'name', 'volume', 'maxWeight', 'speed'],
  }).then(data =>
    res.send(data));
}

function getById(req, res) {
  models.Transport.find({
    attributes: ['id', 'name', 'volume', 'maxWeight', 'speed'],
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
}

function update(req, res) {
  const transport = {};
  if (req.body.transportName !== undefined) transport.name = req.body.transportName;
  if (req.body.volume !== undefined) transport.volume = req.body.volume;
  if (req.body.maxWeight !== undefined) transport.maxWeight = req.body.maxWeight;
  if (req.body.speed !== undefined) transport.speed = req.body.speed;
  models.Transport.update(transport, {
    where: {
      id: req.params.id,
    },
  }).then(() =>
    res.sendStatus(httpStatus.OK));
}

function deleteById(req, res) {
  models.Transport.destroy({
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
