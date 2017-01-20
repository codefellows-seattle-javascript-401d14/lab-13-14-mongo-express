'use strict';

const Router = require('express').Router;
const debug = require('debug')('pokeapp:pokemon-route');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');

const Pokemon = require('../model/pokemon.js');
// const Trainer = require('../model/trainer.js');

const pokemonRouter = module.exports = new Router();

pokemonRouter.post('/api/pokemons', jsonParser, function(req,res,next){
  debug('Post /api/pokemons');
  new Pokemon(req.body).save()
  .then((pokemon) => {
    res.json(pokemon);
  })
  .catch(next);
});

pokemonRouter.get('/api/pokemons/:id', function(req,res,next){
  debug('GET /api/pokemons/:id');
  Pokemon.findById(req.params.id)
  .then(pokemon => res.json(pokemon))
  .catch(err => next(createError(404,err.message)));
});

pokemonRouter.get('/api/pokemons', function(req, res,next){
  debug('Get /api/pokemons');
  Pokemon.find({})
  .then((trainer) => {
    res.json(trainer);
  })
  .catch(err => next(createError(404), err.message));
});

pokemonRouter.delete('/api/pokemons/:id', function(req,res,next){
  debug('Delete /api/pokemons/:id');
  Pokemon.findByIdAndRemove(req.params.id)
  .then(() => res.status(204).send())
  .catch(err => next(createError(404,err.message)));
});
