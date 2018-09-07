const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const users = require('./routes/users');
const storages = require('./routes/storages');
const transport = require('./routes/transport');
const tariffs = require('./routes/tariffs');
const sendings = require('./routes/sendings');
const routeLists = require('./routes/routeLists');

const httpStatus = require('http-status');
const APIError = require('./APIError');
const expressValidation = require('express-validation');

const cors = require('cors');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const allowedDomains = [
  'http://localhost:8080',
  'https://my-delivery-react.herokuapp.com',
];

app.use(cors({
  origin: (origin1, callback) => {
    if (!origin1 || allowedDomains.indexOf(origin1) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin1}`));
    }
  },
}));

app.use('/', routes);
app.use('/users', users);
app.use('/storages', storages);
app.use('/transport', transport);
app.use('/tariffs', tariffs);
app.use('/sendings', sendings);
app.use('/routeLists', routeLists);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: app.get('env') === 'development' ? err.stack : {},
  })
);

module.exports = app;
