'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Thundercat = require('../model/thundercat.js');
const createError = require('http-errors');
const debug = require('debug')('thundercatapp:thundercat-router');


const thundercatRouter = module.exports = new Router;


thundercatRouter.post('/api/thundercats',jsonParser, function(req, res, next) {
  debug('POST /api/thundercats');
  new Thundercat(req.body).save()
  .then(thundercat => res.json(thundercat))
  .catch(next);
});

thundercatRouter.get('/api/thundercats/:id', function(req, res, next){
  debug('GET /api/thundercats/:id');
  Thundercat.findById(req.params.id)
  .then(thundercat => res.json(thundercat))
  .catch(err => next(createError(404, err.message)));
});

thundercatRouter.get('/api/thundercats', function(req, res, next){
  debug('GET /api/thundercats');
  Thundercat.fetchAll()
  .then(ThundercatIds => res.json(ThundercatIds))
  .catch(next);
});

thundercatRouter.delete('/api/thundercats/:id', function(req, res, next){
  debug('DELETE /api/thundercats/:id');
  Thundercat.findByIdAndRemove(req.params.id)
  .then(thundercat => {
    res.statusCode = 204;
    res.json(thundercat);
  })
  .catch(err => next(createError(404, err.message)));
});
