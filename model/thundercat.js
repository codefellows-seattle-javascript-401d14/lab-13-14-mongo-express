'use strict';

const mongoose = require('mongoose');

const thundercatSchema = mongoose.Schema({
  name: {type: String, required: true},
  origin: {type: String, required: true},
  group: {type: String, required: true},
  weapon: {type: String, required: true},
  created: {type: Date, required: true, default: Date.now},
  characters: [{type: mongoose.Schema.Types.ObjectId, ref: 'character'}],
});


module.exports = mongoose.model('thundercat', thundercatSchema);
