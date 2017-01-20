'use-strict';

require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('noteapp:server');

const app = express();
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(require('./route/brewery-router.js'));
app.use(require('./route/beer-router.js'));  //double check to make sure this is correct

app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);
  if (err.status) {
    return res.status(err.status).send();
  }
  if (err.name == 'ValidationError') {
    return res.status(400).send();
  }
  if (err.name == 'MongoError' && err.message.startsWith('E11000 duplicate')) {
   //look at sample code here to be sure it matches
    return res.status(409).send();
  }
});

app.listen(process.env.PORT), function() {
  console.log('Server lit!', process.env.PORT);
};
