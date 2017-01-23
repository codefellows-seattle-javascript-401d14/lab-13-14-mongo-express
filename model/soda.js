'use strict';

const mongoose = require('mongoose');

const sodaSchema = mongoose.Schema({

  brand: {type: String,required: true},
  calories: {type: Number, required: true},
  diet: {type: Boolean, required: true },
  taste: {type: String, required: true},
});

module.exports = mongoose.model('soda', sodaSchema);
