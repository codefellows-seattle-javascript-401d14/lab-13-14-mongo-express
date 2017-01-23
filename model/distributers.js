'use strict';

const mongoose = require('mongoose');
const Soda = require('../model/soda');
const createError = require('http-errors');

const distributerSchema = mongoose.Schema({
  company: {type: String},
  numberofStores: {type: Number},
  Seattle: {type: Boolean},
  sodaID: {type: mongoose.Schema.Types.ObjectId, required: true},
});

distributerSchema.pre('save', function(next){
  Soda.findById(this.sodaID)
  .then(soda => {
    soda.distributer.push(this._id);
    return soda.save();
  })
  .then( () => next ())
  .catch(err => next(createError(404, err.message)));
});


module.exports = mongoose.model('distributer', distributerSchema);
