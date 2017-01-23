'use strict';

require('dotenv').load();
const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
let app = express();

//connect to databse
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI);



app.listen(PORT , () => {
  console.log('Lab 13/14 Server up!');
});
