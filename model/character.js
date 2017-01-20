'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const Thundercat = require('./thundercat.js');

const characterSchema = mongoose.Schema({
  name: {type: String, required: true},
  origin: {type: String, required: true},
  group: {type: String, required: true},
  weapon: {type: String, required: true},
  created: {type: Date, required: true, default: Date.now},
  thundercatID: {type: mongoose.Schema.Types.ObjectId, required: true},
});

characterSchema.pre('save', function(next){
  Thundercat.findById(this.thundercatID)
  .then(thundercat => {
    thundercat.characters.push(this._id);
    return thundercat.save();
  })
  .then(() => next ())
  .catch(err => next(createError(404, err.message)));
});

module.exports = mongoose.model('character', characterSchema);
