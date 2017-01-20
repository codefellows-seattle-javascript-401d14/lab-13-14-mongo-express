'use strict';

const mongoose = require('mongoose');

const sodaSchema = mongoose.Schema({

  brand: {Type: String, required: true},
  calories: {Type: Number, required: true},
  diet: {Type: Boolean, required: true },
  taste: {Type: String, required: true},
});

module.exports = mongoose.model('soda', sodaSchema);
