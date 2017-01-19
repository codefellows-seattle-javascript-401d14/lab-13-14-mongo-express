'use strict';

require('dotenv').load();

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('thundercatapp:server');



const app = express();

mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));

app.use(require('./router/thundercat-router'));

app.use(function(err, req, res, next){
  debug('error middleware');
  console.error(err.message);
  if(err.status){
    return res.status(err.status).send();
  }
  if(err.name == 'ValidationError'){
    return res.status(400).send();
  }
  if(err.name == 'MongoError' && err.message.startsWith('E11000 duplicate')){
    return res.status(409).send();
  }
  res.status(500).send();
});

app.listen(process.env.PORT, () => {
  debug('starting server');
  console.log(' ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n',
'░░░░░░░▄▄▀▀▀▀▀▀▀▀▀▀▀▀▄▄░░░░░░░\n',
'░░░░░▄▀░░░░░░░░░░░▄▄▄░░▀▄░░░░░\n',
'░░░▄▀░░░░░░░░░▄▄███▀▄██▄░▀▄░░░\n',
'░░█░░░░░░░░▄█████▄▄█████▄░░█▄░\n',
'░█░░░░░░░▄█▀▄████████████▄░░█░\n',
'░█░░░░▄█████████████▄▀████░░█░\n',
'░█░░▄█████████████████░███░░█░\n',
'░█░░█████▀░░░░░███████▀███░░█░\n',
'░▀▄░▀███░░░░░░░██████▀░░▀▀░░█░\n',
'░░▀▄░░▀█▄░░░░░▄██▀▀░░░░░░░░░█░\n',
'░░░▀▄░░░░░▄▄▄████▄▄░░░░░░░▄▀░░\n',
'░░░░░▀▄▄░░░▀▀▀▀▀▀▀░░░░░░▄▀░░░░\n',
'░░░░░░░░▀▀▄▄▄▄▄▄▄▄▄▄▀▀▀░░░░░░░\n',
'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n',process.env.PORT);
});
