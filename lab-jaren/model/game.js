'use strict';

const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  title: {type: String, required: true},
  genre: {type: String, required: true},
  developer: {type: String, required: true},
  publisher: {type: String},
  platforms: {type: String},
  ratingESRB: {type: String},
  releaseDate: {type: String},
});

// creates games collection and Game constructor
module.exports = mongoose.model('game', gameSchema);
