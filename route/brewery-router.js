'use strict';

const Router = require('express').Router;
const Brewery = require('../model/brewery.js');
const jsonParser = require('body-parser').json();
const breweryRouter = module.exports = new Router();
const createError = require('http-errors');
const debug = require('debug')('noteapp:list-router');

breweryRouter.post('/api/breweries', jsonParser, function(req, res, next) {
  debug('POST /api/breweries');
  new Brewery(req.body).save()
  .then(list => res.json(list))
  .catch(next);
});

breweryRouter.get('/api/breweries/:id', function(req, res, next) {
  debug('GET /api/brewries/:id');
  Brewery.findById(req.params.id)
  .then(brewery => res.json(brewery))
  .catch(err => next(createError(404, err.message)));
});

breweryRouter.delete('/api/breweries/:id', function(req, res, next) {
  debug('DELETE /api/breweries/id');
  Brewery.findByIdAndRemove(req.params.id)
  .then(brewery => {
    res.statusCode = 204;
    res.json(brewery);
  })
  .catch(err => next(createError(404, err.message)));
});
//BONUS
breweryRouter.get('/api/breweries', function(req, res, next) {
  debug('GET /api/brewries');
  Brewery.find({})
  .then(brewery => res.json(brewery))
  .catch(err => next(createError(404, err.message)));
});
