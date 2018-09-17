const models = require('../models');
const db = require('../models');
const httpStatus = require('http-status');
const _ = require('lodash');
const nodemailer = require('nodemailer');

function create(req, res) {
  models.Sending.create(
    _.pick(req.body, ['date', 'number', 'status', 'idStorageSender', 'idStorageReceiver',
      'weight', 'amount', 'coment', 'idUserSender', 'idUserReceiver', 'fragile', 'cost'])
  ).then((data) => {
    models.User.find({
      attributes: ['email'],
      where: {
        id: req.body.idUserSender,
      },
    }).then((userData) => {
      if (userData.email !== null) {
        const transporter = nodemailer.createTransport({
          host: 'smtp.ukr.net',
          port: 465,
          secure: true,
          auth: {
            user: 'adsfgs@ukr.net',
            pass: 'hflboezj1',
          },
        });
        const mailOptions = {
          from: 'adsfgs@ukr.net',
          to: userData.email,
          subject: 'Email from delivery',
          text: `You have created a new sending. Number of your sending - ${data.get('number')}. 
          You can find information about your sending using this number!`,
        };
        transporter.sendMail(mailOptions);
      }
    });
    res.status(httpStatus.CREATED).json({ id: data.get('id'), number: data.get('number') });
  });
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

function getbetweenStorages(req, res) {
  models.Sending.findAll({
    attributes: ['id', 'number', 'weight'],
    where: {
      status: 'in_processing',
      idStorageSender: req.query.idStorageSender,
      idStorageReceiver: req.query.idStorageReceiver,
    },
  }).then(data =>
    res.send(data));
}

function getByNumber(req, res) {
  const number = `${req.params.number}`;
  const query = 'SELECT date, number, status, cost, userSender.name as sender, userReceiver.name as ' +
                'receiver, storage.name as storage FROM delivery_db.Sendings ' +
                'LEFT JOIN delivery_db.Users as userSender ON Sendings.idUserSender = userSender.id ' +
                'LEFT JOIN delivery_db.Users as userReceiver ON Sendings.idUserReceiver = userReceiver.id ' +
                'LEFT JOIN delivery_db.Storages as storage ON Sendings.idStorageReceiver = storage.id ' +
                'WHERE number=';
  db.sequelize.query(query + number,
    {
      plain: true,
    })
    .then(data =>
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
  getbetweenStorages,
  getByNumber,
  update,
  deleteById,
};
