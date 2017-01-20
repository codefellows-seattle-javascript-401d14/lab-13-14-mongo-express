'use strict';

const Router = require('express');
const jsonParser = require('body-parser').json();
const debug = require('debug')('thundercatapp:character-router');
const createError = require('http-errors');

const Character = require('../model/character.js');
const Thundercat = require('../model/thundercat.js');

const characterRouter = module.exports = new Router();


characterRouter.post('/api/characters', jsonParser, function(req, res, next){
  new Character(req.body).save()
    .then(character => res.json(character))
    .catch(next);
});

characterRouter.get('/api/characters/:id', function(req, res, next){
  debug('GET /api/characters/:id');
  Character.findById(req.params.id)
  .then(character => res.json(character))
  .catch(err => next(createError(404, err.message)));
});

characterRouter.delete('/api/characters/:id', function(req, res, next){
  debug('DELETE /api/characters/:id');
  Character.findByIdAndRemove(req.params.id)
  .then(() =>  {
    res.status(204).send();
  })

  .catch(err => next(createError(404, err.message)));
});
