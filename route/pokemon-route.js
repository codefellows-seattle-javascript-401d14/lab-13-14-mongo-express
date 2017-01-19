'use strict';

const Router = require('express').Router;
const debug = require('debug')('pokeapp:pokemon-route');
const jsonParser = require('body-parser').json();

const Pokemon = require('../model/pokemon.js');
const Trainer = require('../model/trainer.js');

const pokemonRouter = module.exports = new Router();

pokemonRouter.post('/api/pokemons', jsonParser, function(req,res,next){
  debug('Post /api/pokemons');
  new Pokemon(req.body).save()
  .then((pokemon) => {
    res.json(pokemon);
  })
  .catch(next);
});
