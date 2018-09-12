const Joi = require('joi');

module.exports.user = {
  create: {
    body: {
      userName: Joi.string().alphanum().min(3).max(30).required(), // eslint-disable-line newline-per-chained-call
      phone: Joi.string().regex(/^[0-9]+$/, 'numbers').length(9).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }),
      password: Joi.string().regex(/^[a-zA-Z0-9_-]+$/).max(100),
    },
    options: {
      allowUnknownBody: false,
      allowUnknownHeaders: false,
      allowUnknownQuery: false,
      allowUnknownParams: false,
    },
  },
  update: {
    params: {
      id: Joi.number().integer().positive().required(),
    },
    body: {
      userName: Joi.string().alphanum().min(3).max(30).optional(), // eslint-disable-line newline-per-chained-call
      phone: Joi.string().regex(/^[0-9]+$/, 'numbers').length(9).optional(),
      email: Joi.string().email({ minDomainAtoms: 2 }).optional(),
      password: Joi.string().regex(/^[a-zA-Z0-9_-]+$/).min(6).max(100).optional(), // eslint-disable-line newline-per-chained-call
    },
    options: {
      allowUnknownBody: false,
      allowUnknownHeaders: false,
      allowUnknownQuery: false,
      allowUnknownParams: false,
    },
  },
  getAll: {
    query: {
      page: Joi.number().integer().positive(),
    },
    options: {
      allowUnknownQuery: false,
    },
  },
};

module.exports.storage = {
  create: {
    body: {
      storageName: Joi.string().regex(/^[a-zA-Z0-9А-Яа-яЁёЇїІіЄєҐґ\s_\\-\\#№]+$/).min(2).max(255).required(), // eslint-disable-line newline-per-chained-call
      country: Joi.string().min(2).max(255).required(), // eslint-disable-line newline-per-chained-call
      region: Joi.string().min(2).max(255).required(), // eslint-disable-line newline-per-chained-call
      city: Joi.string().min(2).max(255).required(), // eslint-disable-line newline-per-chained-call
      street: Joi.string().min(2).max(255).required(), // eslint-disable-line newline-per-chained-call
      house: Joi.string().min(1).max(10).required(), // eslint-disable-line newline-per-chained-call
      storageType: Joi.any().valid('less_than_30', 'more_than_30').required(), // eslint-disable-line newline-per-chained-call
    },
    options: {
      allowUnknownBody: false,
      allowUnknownHeaders: false,
      allowUnknownQuery: false,
      allowUnknownParams: false,
    },
  },
  update: {
    params: {
      id: Joi.number().integer().positive().required(),
    },
    body: {
      storageName: Joi.string().regex(/^[a-zA-Z0-9\s_\\-\\#№]+$/).min(2).max(255).optional(), // eslint-disable-line newline-per-chained-call
      country: Joi.string().alphanum().min(2).max(255).optional(), // eslint-disable-line newline-per-chained-call
      region: Joi.string().regex(/^[a-zA-Z\s]+$/, 'alpha').min(2).max(255).optional(), // eslint-disable-line newline-per-chained-call
      city: Joi.string().regex(/^[a-zA-Z\s]+$/, 'alpha').min(2).max(255).optional(), // eslint-disable-line newline-per-chained-call
      street: Joi.string().regex(/^[a-zA-Z\s]+$/, 'alpha').min(2).max(255).optional(), // eslint-disable-line newline-per-chained-call
      house: Joi.string().regex(/^[0-9]+[\s]*[a-zA-Z]*$/).min(1).max(10).optional(), // eslint-disable-line newline-per-chained-call
      storageType: Joi.any().valid('less_than_30', 'more_than_30').optional(), // eslint-disable-line newline-per-chained-call
    },
    options: {
      allowUnknownBody: false,
      allowUnknownHeaders: false,
      allowUnknownQuery: false,
      allowUnknownParams: false,
    },
  },
};

module.exports.transport = {
  create: {
    body: {
      transportName: Joi.string().regex(/^[a-zA-Z0-9\s_\\-\\#№]+$/).min(3).max(255).required(), // eslint-disable-line newline-per-chained-call
      volume: Joi.number().integer().positive().max(1000).required(), // eslint-disable-line newline-per-chained-call
      maxWeight: Joi.number().integer().positive().max(10000).required(), // eslint-disable-line newline-per-chained-call
      speed: Joi.number().integer().positive().max(200).required(), // eslint-disable-line newline-per-chained-call
    },
    options: {
      allowUnknownBody: false,
      allowUnknownHeaders: false,
      allowUnknownQuery: false,
      allowUnknownParams: false,
    },
  },
  update: {
    params: {
      id: Joi.number().integer().positive().required(),
    },
    body: {
      transportName: Joi.string().regex(/^[a-zA-Z0-9\s_\\-\\#№]+$/).min(3).max(255).optional(), // eslint-disable-line newline-per-chained-call
      volume: Joi.number().integer().positive().max(1000).optional(), // eslint-disable-line newline-per-chained-call
      maxWeight: Joi.number().integer().positive().max(10000).optional(), // eslint-disable-line newline-per-chained-call
      speed: Joi.number().integer().positive().max(200).optional(), // eslint-disable-line newline-per-chained-call
    },
    options: {
      allowUnknownBody: false,
      allowUnknownHeaders: false,
      allowUnknownQuery: false,
      allowUnknownParams: false,
    },
  },
};

module.exports.tariff = {
  create: {
    body: {
      date: Joi.date().min('01-01-2018').iso().required(),
      idStorageSender: Joi.number().integer().positive().required(),
      idStorageReceiver: Joi.number().integer().positive().required(),
      minWeight: Joi.number().integer().positive().max(10000).required(), // eslint-disable-line newline-per-chained-call
      maxWeight: Joi.number().integer().positive().max(10000).greater(Joi.ref('minWeight')).required(), // eslint-disable-line newline-per-chained-call
      fragile: Joi.boolean(),
      price: Joi.number().integer().positive().max(1000000).required(), // eslint-disable-line newline-per-chained-call
    },
    options: {
      allowUnknownBody: false,
      allowUnknownHeaders: false,
      allowUnknownQuery: false,
      allowUnknownParams: false,
    },
  },
  update: {
    params: {
      id: Joi.number().integer().positive().required(),
    },
    body: {
      date: Joi.date().min('01-01-2018').iso().optional(),
      idStorageSender: Joi.number().integer().positive().optional(),
      idStorageReceiver: Joi.number().integer().positive().optional(),
      minWeight: Joi.number().integer().positive().max(10000).optional(), // eslint-disable-line newline-per-chained-call
      maxWeight: Joi.number().integer().positive().max(10000).greater(Joi.ref('minWeight')).optional(), // eslint-disable-line newline-per-chained-call
      fragile: Joi.boolean().optional(),
      price: Joi.number().integer().positive().max(1000000).optional(), // eslint-disable-line newline-per-chained-call
    },
    options: {
      allowUnknownBody: false,
      allowUnknownHeaders: false,
      allowUnknownQuery: false,
      allowUnknownParams: false,
    },
  },
};

module.exports.sending = {
  create: {
    body: {
      date: Joi.date().min('01-01-2018').iso().required(),
      number: Joi.string().regex(/^[0-9]+$/, 'numbers').max(25).required(),
      status: Joi.any().valid('in_processing', 'en_route', 'ready_to_giving').required(),
      idStorageSender: Joi.number().integer().positive().required(),
      idStorageReceiver: Joi.number().integer().positive().required(),
      weight: Joi.number().integer().positive().max(10000).required(), // eslint-disable-line newline-per-chained-call
      amount: Joi.number().integer().positive().max(1000000).required(), // eslint-disable-line newline-per-chained-call
      coment: Joi.string().allow('').max(255),
      idUserSender: Joi.number().integer().positive().required(),
      idUserReceiver: Joi.number().integer().positive().required(),
      fragile: Joi.boolean(),
      cost: Joi.number().integer().positive().max(1000000).required(), // eslint-disable-line newline-per-chained-call
    },
    options: {
      allowUnknownBody: false,
      allowUnknownHeaders: false,
      allowUnknownQuery: false,
      allowUnknownParams: false,
    },
  },
  update: {
    params: {
      id: Joi.number().integer().positive().required(),
    },
    body: {
      date: Joi.date().min('01-01-2018').iso().optional(),
      number: Joi.string().regex(/^[0-9]+$/, 'numbers').max(25).optional(),
      status: Joi.any().valid('in_processing', 'en_route', 'ready_to_giving').optional(),
      idStorageSender: Joi.number().integer().positive().optional(),
      idStorageReceiver: Joi.number().integer().positive().optional(),
      weight: Joi.number().integer().positive().max(10000).optional(), // eslint-disable-line newline-per-chained-call
      amount: Joi.number().integer().positive().max(1000000).optional(), // eslint-disable-line newline-per-chained-call
      coment: Joi.string().allow('').max(255).optional(),
      idUserSender: Joi.number().integer().positive().optional(),
      idUserReceiver: Joi.number().integer().positive().optional(),
      fragile: Joi.boolean().optional(),
      cost: Joi.number().integer().positive().max(1000000).optional(), // eslint-disable-line newline-per-chained-call
    },
    options: {
      allowUnknownBody: false,
      allowUnknownHeaders: false,
      allowUnknownQuery: false,
      allowUnknownParams: false,
    },
  },
};

module.exports.routeList = {
  create: {
    body: {
      date: Joi.date().min('01-01-2018').iso().required(),
      expectingDate: Joi.date().min('01-01-2018').iso(),
      actualDate: Joi.date().min('01-01-2018').iso(),
      idSending: Joi.number().integer().positive().required(),
      idTransport: Joi.number().integer().positive().required(),
      idStorageSender: Joi.number().integer().positive().required(),
      idStorageReceiver: Joi.number().integer().positive().required(),
    },
    options: {
      allowUnknownBody: false,
      allowUnknownHeaders: false,
      allowUnknownQuery: false,
      allowUnknownParams: false,
    },
  },
  update: {
    params: {
      id: Joi.number().integer().positive().required(),
    },
    body: {
      date: Joi.date().min('01-01-2018').iso().optional(),
      expectingDate: Joi.date().min('01-01-2018').iso().optional(),
      actualDate: Joi.date().min('01-01-2018').iso().optional(),
      idSending: Joi.number().integer().positive().optional(),
      idTransport: Joi.number().integer().positive().optional(),
      idStorageSender: Joi.number().integer().positive().optional(),
      idStorageReceiver: Joi.number().integer().positive().optional(),
    },
    options: {
      allowUnknownBody: false,
      allowUnknownHeaders: false,
      allowUnknownQuery: false,
      allowUnknownParams: false,
    },
  },
};
