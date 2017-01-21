'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const Super = require('./Superhero');

const villainSchema = mongoose.Schema({
  name: {type: String, required: true},
  power: {type: String, required: true},
  createdAt: {type: Date, required: true, default: Date.now},
  superId: {type: mongoose.Schema.Types.ObjectId, required: true},
});
villainSchema.pre('save', function(next) {
  Super.findById(this.superId)
  .then(superhero => {
    superhero.villains.push(this._id);
    return superhero.save();
  })
  .then(() => next())
  .catch(err => next(createError(404, err.message)));
});
module.exports = mongoose.model('villain', villainSchema);
