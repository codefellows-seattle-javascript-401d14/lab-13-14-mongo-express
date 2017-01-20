'use strict';

const mongoose = require('mongoose');
const superSchema = mongoose.Schema({
  name: {type: String, required: true},
  power: {type: String, required: true},
  createdAt: {type: Date, required: true, default: Date.now},
  updatedAt: {type: Date, required: true, default: Date.now},
  villains: [{type: mongoose.Schema.Types.ObjectId, ref: 'villain'}],
});

module.exports = mongoose.model('superhero', superSchema);
