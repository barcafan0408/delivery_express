const models = require('../models');
const httpStatus = require('http-status');

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
    res.status(httpStatus.CREATED).json({ id: data.get('id') }),
  );
}

function getAll(req, res) {
  models.Storage.findAll({
    attributes: ['name', 'country', 'region', 'city', 'street', 'house', 'storageType'],
  }).then(data =>
    res.send(data));
}

function getById(req, res) {
  models.Storage.find({
    attributes: ['name', 'country', 'region', 'city', 'street', 'house', 'storageType'],
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
}

function update(req, res) {
  const storage = {};
  if (req.body.storageName !== undefined) storage.name = req.body.storageName;
  if (req.body.country !== undefined) storage.country = req.body.country;
  if (req.body.region !== undefined) storage.region = req.body.region;
  if (req.body.city !== undefined) storage.city = req.body.city;
  if (req.body.street !== undefined) storage.street = req.body.street;
  if (req.body.house !== undefined) storage.house = req.body.house;
  if (req.body.storageType !== undefined) storage.storageType = req.body.storageType;
  models.Storage.update(storage, {
    where: {
      id: req.params.id,
    },
  }).then(() =>
    res.sendStatus(httpStatus.OK));
}

function deleteById(req, res) {
  models.Storage.destroy({
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
