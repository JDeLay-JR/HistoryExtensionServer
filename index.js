/* eslint-disable global-require */
/* eslint-disable no-unused-vars */

const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const PORT = process.env.PORT || 8080;
const app = express();

module.exports = app;

const createApp = () => {
  // http header security middleware
  app.use(helmet());

  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // compression middleware
  app.use(compression());

  // routes
  app.use('/api', require('./api'));


  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
};

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  createApp();
  startListening();
} else {
  createApp();
}
