'use strict';

const Router = require('express').Router;
const Superhero = require('../model/Superhero');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('superApp: routes-superhero');

const superRouter = module.exports = new Router();

superRouter.post('/api/superheroes', jsonParser, function(req, res, next) {
  debug('POST /api/superheroes');
  new Superhero(req.body).save()
  .then(superhero => res.json(superhero))
  .catch(next);
});

superRouter.get('/api/superheroes/:id', function(req, res, next) {
  debug('GET /api/superheroes/:id');
  Superhero.findById(req.params.id)
  .then(superheroes => res.json(superheroes))
  .catch(err => next(createError(404, err.message)));
});

superRouter.get('/api/superheroes', (req, res, next) => {
  debug('GET /api/superheroes');
  Superhero.find({})
  .then(superheroes => res.json(superheroes))
  .catch(err => next(createError(404, err.message)));
});

superRouter.delete('/api/superheroes/:id', (req, res, next) => {
  debug('DELETE /api/superheroes/:id');
  Superhero.findByIdAndRemove(req.params.id)
  .then(superheroes => {
    res.statusCode =204;
    res.json(superheroes);
  })
  .catch(err => next(createError(404, err.message)));
});
