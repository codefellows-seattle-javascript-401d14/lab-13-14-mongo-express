'use strict';

const Router = require('express').Router;
const Villain = require('../model/Villain');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('superApp: routes-villain');

const villainRouter = module.exports = new Router();

villainRouter.post('/api/villains', jsonParser, function(req, res, next) {
  debug('POST /api/villains');
  new Villain(req.body).save()
  .then(villain => res.json(villain))
  .catch(next);
});

villainRouter.get('/api/villains/:id', function(req, res, next) {
  debug('GET /api/villains/:id');
  Villain.findById(req.params.id)
  .then(villain => res.json(villain))
  .catch(err => next(createError(404, err.message)));
});

villainRouter.get('/api/villains', function(req, res, next) {
  debug('GET /api/villains');
  Villain.find({})
  .then(villains => res.json(villains))
  .catch(err => next(createError(404, err.message)));
});

villainRouter.delete('/api/villains/:id', function(req, res, next) {
  debug('DELETE /api/villains/:id');
  Villain.findByIdAndRemove(req.params.id)
  .then(() => res.status(204).send())
  .catch(err => next(createError(404, err.message)));
});
