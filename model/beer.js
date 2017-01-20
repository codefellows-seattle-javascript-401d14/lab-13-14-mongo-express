'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const Brewery = require('./brewery.js');

const beerSchema = mongoose.Schema({
  nameOfBeer: {type: String, required: true},
  typeOfBeer:{type: String, required: true},
  percentOfBeer: {type: Number, required: true},
  breweryID: {type: mongoose.Schema.Types.ObjectId, required: true},
  created: {type: Date, required: true, default: Date.now},
});

beerSchema.pre('save', function(next) {
  Brewery.findById(this.breweryID)
  .then(brewery => {
    brewery.beers.push(this._id);
    return brewery.save();
  })
  .then(() => next())
  .catch(err => next(createError(404, err.message)));
});

module.exports = mongoose.model('beer', beerSchema);
