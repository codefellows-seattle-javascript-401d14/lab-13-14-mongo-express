'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const Sport = require('./sport.js');

const commentSchema = mongoose.Schema({
  comment: {type: String, required: true},
  year: {type: String, required: true},
  team: {type: String, required: true},
  sportID: {type: mongoose.Schema.Types.ObjectId, required: true},
  created: {type: Date, required: true, default: Date.now},
});

commentSchema.pre('save', function(next){
  console.log('|[●▪▪●]|', this);
  Sport.findById(this.sportID)
  .then(sport =>{
    sport.comments.push(this._id);
    return sport.save();
  })
  .then(() => next())
  .catch(err => next(createError(404, err.message)));
});
// creates comments collection and Comment constructor
module.exports = mongoose.model('comment', commentSchema);
