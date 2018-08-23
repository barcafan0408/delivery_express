const models = require('../models');
const httpStatus = require('http-status');

const { perPage } = require('../config/config');

function create(req, res) {
  models.User.create({
    name: req.body.userName,
    phone: `+380${req.body.phone}`,
    email: req.body.email,
    password: req.body.password,
  }).then(data =>
    res.status(httpStatus.CREATED).json({ id: data.get('id') }),
  );
}

function getAll(req, res) {
  models.User.findAndCountAll({
    attributes: ['name', 'phone', 'email'],
    offset: perPage * ((req.query.page || 1) - 1),
    limit: perPage,
  }).then((data) => {
    const pages = Math.ceil(data.count / perPage);
    res.set('x-total-count', pages).json(data.rows);
  });
}

function getById(req, res) {
  models.User.find({
    attributes: ['name', 'phone', 'email'],
    where: {
      id: req.params.id,
    },
  }).then(data =>
    res.send(data));
}

function update(req, res) {
  const user = {};
  if (req.body.userName !== undefined) user.name = req.body.userName;
  if (req.body.phone !== undefined) user.phone = `+380${req.body.phone}`;
  if (req.body.email !== undefined) user.email = req.body.email;
  if (req.body.password !== undefined) user.password = req.body.password;
  models.User.update(user, {
    where: {
      id: req.params.id,
    },
  }).then(() =>
    res.sendStatus(httpStatus.OK));
}

function deleteById(req, res) {
  models.User.destroy({
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
