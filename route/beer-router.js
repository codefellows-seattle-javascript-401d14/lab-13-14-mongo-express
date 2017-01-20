'use strict';

const Router = require('express').Router;
const Beer = require('../model/beer.js');
const jsonParser = require('body-parser').json();
const beerRouter = module.exports = new Router();
const createError = require('http-errors');
const debug = require('debug')('beerapp:beer-router');

beerRouter.post('/api/beers', jsonParser, function(req, res, next) {
  debug('POST /api/beers');
  new Beer(req.body).save()
  .then(list => res.json(list))
  .catch(next);
});

beerRouter.get('/api/beers/:id', function(req, res, next) {
  debug('GET /api/beers/:id');
  Beer.findById(req.params.id)
  .then(beer => res.json(beer))
  .catch(err => next(createError(404, err.message)));
});

beerRouter.delete('/api/beers/:id', function(req, res, next) {
  debug('DELETE /api/beers/id');
  Beer.findByIdAndRemove(req.params.id)
  .then(() => {
    res.status(204).send;
  })
  .catch(err => next(createError(404, err.message)));
});
//BONUS
beerRouter.get('/api/beers', function(req, res, next) {
  debug('GET /api/beers');
  Beer.find({})
  .then(brewery => res.json(brewery))
  .catch(err => next(createError(404, err.message)));
});
