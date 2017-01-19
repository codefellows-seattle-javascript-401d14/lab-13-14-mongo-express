'use strict';

//load env vars
require('dotenv').load();

//require npm modules
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('sportapp:server');


// require app modules
// create module vars
const app = express();

// connect to database
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI);

// load app midlewhere
app.use(morgan('dev'));
app.use(cors());

// load app routes
app.use(require('./route/sport-router.js'));

// load app error middleware
app.use(function(err, req, res, next){
  debug('error middleware');
  console.error(err.message);
  if (err.status) {
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

// start server
app.listen(process.env.PORT, function(){
  console.log('(っ◕‿◕)っ❚█══█❚', process.env.PORT);
});
