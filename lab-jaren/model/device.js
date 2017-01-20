'use strict';

const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
  family: {type: String, required: true}, // computer or console
  platform: {type: String, required: true}, // PC, Mac, Xbox, PS4
  games: [{type: mongoose.Schema.Types.ObjectId, ref:'game'}],
});

// creates devices collection and Device constructor
module.exports = mongoose.model('device', deviceSchema);
