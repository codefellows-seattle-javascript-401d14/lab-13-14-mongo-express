'use strict';

const mongoose = require('mongoose');

const brewerySchema = mongoose.Schema({
  nameOfBrewery: {type: String, required: true},
  beers: [{type: mongoose.Schema.Types.ObjectId, ref: 'beer'}],
  created: {type: Date, required: true, default: Date.now},
});

//creates breweries collection and brewery list constructor
module.exports = mongoose.model('brewery', brewerySchema);
