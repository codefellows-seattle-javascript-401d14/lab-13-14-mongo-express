'use strict';

const Router = require('express').Router;
const Superhero = require('../model/Superhero');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('superApp: routes-superhero');

const superRouter = module.exports = new Router();

superRouter.post('/api/superheros', jsonParser, function(req, res, next) {
  debug('POST /api/superheros');
  new Superhero(req.body).save()
  .then(superhero => res.json(superhero))
  .catch(next);
});

superRouter.get('/api/superheros/:id', function(req, res, next) {
  debug('GET /api/superheros/:id');
  Superhero.findById(req.params.id)
  .then(superheros => res.json(superheros))
  .catch(err => next(createError(404, err.message)));
});

superRouter.get('/api/superheros', (req, res, next) => {
  debug('GET /api/superheros');
  Superhero.find({})
  .then(superheros => res.json(superheros))
  .catch(err => next(createError(404, err.message)));
});

superRouter.delete('/api/superheros/:id', (req, res, next) => {
  debug('DELETE /api/superheros/:id');
  Superhero.findByIdAndRemove(req.params.id)
  .then(superheros => {
    res.statusCode =204;
    res.json(superheros);
  })
  .catch(err => next(createError(404, err.message)));
});
