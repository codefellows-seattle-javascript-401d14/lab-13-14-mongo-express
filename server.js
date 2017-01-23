'use strict';

require('dotenv').load();
const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const PORT = process.env.PORT || 3000;
let app = express();
const debug = require('debug')('noteapp:server');

//connect to databse
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI);


//dont forget this step!!!
app.use(require('./lib/soda-router'));

app.use(function(err, req, res, next){
  debug('error middleware');
  console.error(err.message);
  if (err.status) {
    return res.status(err.status).send();
  }
  if (err.name == 'ValidationError'){
    return res.status(400).send();
  }
  if (err.name === 'MongoError' && err.message.startsWith('E11000 duplicate')){
   // 409 means conflict im using it for duplicate errors
    err = createError(409, err.message);
    res.status(err.status).send(err.name);
    next();
    return;
  }

  res.status(500).send();
});

app.listen(PORT , () => {
  console.log('Lab 13/14 Server up!');
});
