'use strict';

const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
  nameOfBrewery: {type: String, required: true},
  nameOfBeer: {type: String, required: true},
  typeOfBeer:{type: String, required: true},
  percentOfBeer: {type: Number, required: true},
  created: {type: Date, required: true, default: Date.now},
});

//creates breweries collection and brewery list constructor
module.exports = mongoose.model('list', listSchema);
