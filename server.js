'use strict';

require('dotenv').load();

const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('trainerapp:server');
const app = express();

mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI);

app.use(morgan('dev'));
app.use(cors());

app.use(require('./route/trainer-route.js'));

app.use(function(err,req,res, next){
  debug('error middleware');
  if(err.status){
    return res.status(err.status).send();
  }
  if (err.name == 'ValidationError'){
    return res.status(400).send();
  }
  if (err.name == 'MongoError' && err.message.startsWith('E11000 duplicate')){
    return res.status(409).send();
  }
  res.status(500).send();
});

app.listen(process.env.PORT, function(){
  console.log('SERVER is up, Trainers get ready @ port: ', process.env.PORT);
});
