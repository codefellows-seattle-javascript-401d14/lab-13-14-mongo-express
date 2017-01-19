'use strict';

const Router = require('express').Router;
const Sport = require('../model/sport.js');
const jsonParser = require('body-parser').json();
const debug = require('debug')('sportapp:sport-router');
const createError = require('http-errors');

const sportRouter = module.exports = new Router();

sportRouter.post('/api/sports', jsonParser, function(req, res, next){
  debug('POST /api/sports');
  new Sport(req.body).save()
  .then(sport => res.json(sport))
  .catch(next);
});

sportRouter.get('/api/sports/:id', function(req, res, next){
  debug('GET /api/sports/:id');
  Sport.findById(req.params.id)
  .then(sport => res.json(sport))
  .catch(err => next(createError(404, err.message)));
});

sportRouter.delete('/api/sports/:id', function(req, res, next){
  debug('DELETE /api/sports/:id');
  Sport.findByIdAndRemove(req.params.id)
  .then(() =>  {
    res.status(204).send();
  })

  .catch(err => next(createError(404, err.message)));
});

sportRouter.get('/api/sports/', function(req, res, next){
  debug('GET /api/sports/');
  Sport.find(req.params.id)
  .then(sport => res.json(sport))
  .catch(err => next(createError(404, err.message)));
});
