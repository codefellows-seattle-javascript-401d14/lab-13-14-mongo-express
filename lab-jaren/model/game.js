'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const Device = require('./device.js');

const gameSchema = mongoose.Schema({
  title: {type: String, required: true},
  genre: {type: String, required: true},
  developer: {type: String, required: true},
  publisher: {type: String},
  ratingESRB: {type: String},
  releaseDate: {type: String},
  deviceID: {type: mongoose.Schema.Types.ObjectId, required: true},
});

gameSchema.pre('save', function(next) {
  Device.findById(this.deviceID)
  .then(device => {
    device.games.push(this._id);
    return device.save();
  })
  .then(() => next())
  .catch(err => next(createError(404, err.message)));
});

// creates games collection and Game constructor
module.exports = mongoose.model('game', gameSchema);
