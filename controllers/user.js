const models = require('../models');

function create(req, res) {
  models.User.create({
    name: req.body.userName,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
  }).then(data =>
    res.send(data));
}

function getAll(req, res) {
  models.User.findAll().then(data =>
    res.send(data));
}

function getById(req, res) {
  models.User.find({
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
}

function update(req, res) {
  models.User.update({
    name: req.body.userName,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
  }, {
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
}

function deleteById(req, res) {
  models.User.destroy({
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
