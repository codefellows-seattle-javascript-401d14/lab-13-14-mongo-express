'use strict';

require('dotenv').load();

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('gameapp:server');

const app = express();

mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI);

app.use(morgan('dev'));
app.use(cors());

app.use(require('./lib/game-router.js'));

app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);
  if (err.status)
    return res.status(err.status).send();
  if (err.name == 'ValidationError')
    return res.status(400).send();
  if (err.name == 'MongoError' && err.message.startsWith('E11000 duplicate'))
    return res.status(409).send();
  res.status(500).send();
});

app.listen(process.env.PORT, function() {
  console.log('server up!', process.env.PORT);
});
