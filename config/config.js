module.exports = {
  development: {
    db: {
      host: 'localhost',
      name: 'delivery_db',
      user: 'root',
      password: 'barcafan1'
    },
  },
  test: {
    db: {
      host: 'localhost',
      name: 'delivery_db',
      user: 'root',
      password: 'barcafan1'
    },
  },
  production: {
    db: {

      host: process.env.DB_HOSTNAME,
      name: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
  },
};
