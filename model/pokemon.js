'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const Trainer = require('./trainer.js');

const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  name: {type: String, required:true},
  type: {type:String, required:true},
  pokedexNum: {type:Number, required:true},
  moves: {type:Array, required:false},
  trainerID: {type:mongoose.Schema.ObjectId, required:true},
});

pokemonSchema.pre('save', function(next){
  Trainer.findById(this.trainerID)
  .then(trainer => {
    trainer.pokemon.push(this._id);
    return trainer.save();
  })
  .then(() => next())
  .catch((err) => next(createError(404, err.message)));
});

module.exports = mongoose.model('pokemon', pokemonSchema);
