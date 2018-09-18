const models = require('../models');
const db = require('../models');
const httpStatus = require('http-status');
const _ = require('lodash');

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];

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
  const query = `SELECT RouteLists.id, RouteLists.date, expectingDate, actualDate, transport.name as transport, storageSender.name as sender,
    storageReceiver.name as receiver, sending.number FROM ${config.db.name}.RouteLists 
    LEFT JOIN ${config.db.name}.Transports as transport ON RouteLists.idTransport = transport.id 
    LEFT JOIN ${config.db.name}.Storages as storageSender ON RouteLists.idStorageSender = storageSender.id 
    LEFT JOIN ${config.db.name}.Storages as storageReceiver ON RouteLists.idStorageReceiver = storageReceiver.id 
    LEFT JOIN ${config.db.name}.RouteListSendings as sendings ON RouteLists.id = sendings.idRouteList 
    LEFT JOIN ${config.db.name}.Sendings as sending ON sendings.idSending = sending.id
    WHERE RouteLists.removeDate is null AND !RouteLists.complete`;
  db.sequelize.query(query,
    {
      type: db.sequelize.QueryTypes.SELECT,
    })
    .then((data) => {
      const results = [];
      for (let i = 0; i < data.length; i += 1) {
        const index = results.findIndex(element =>
          element.id === data[i].id
        );
        if (index < 0) {
          data[i].sendings = [data[i].number];
          results.push(data[i]);
        } else {
          results[index].sendings.push(data[i].number);
        }
      }
      for (let i = 0; i < results.length; i += 1) {
        delete results[i].number;
      }
      res.send(results);
    });
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
  }).then(() => {
    models.RouteListSending.findAll({
      attributes: ['idSending'],
      where: {
        idRouteList: req.params.id,
      },
    }).then((data) => {
      data.map(el =>
        models.Sending.update({ status: 'ready_to_giving' }, {
          where: {
            id: el.idSending,
          },
        }),
      );
    });
    res.sendStatus(httpStatus.OK);
  });
}

function deleteById(req, res) {
  models.RouteList.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    models.RouteListSending.findAll({
      attributes: ['idSending'],
      where: {
        idRouteList: req.params.id,
      },
    }).then((data) => {
      data.map(el =>
        models.Sending.update({ status: 'in_processing' }, {
          where: {
            id: el.idSending,
          },
        }),
      );
    });
    res.sendStatus(httpStatus.NO_CONTENT);
  });
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
