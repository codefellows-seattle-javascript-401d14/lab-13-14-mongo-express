'use strict';

const Router = require('express').Router;
const Trainer = require('../model/trainer.js');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('trainerapp:trainer-route');

const trainerRouter = module.exports = new Router();

trainerRouter.post('/api/trainers', jsonParser, function(req, res, next){
  debug('Post /api/trainers');
  new Trainer(req.body).save()
  .then((trainer) => {
    res.json(trainer);
  })
  .catch(next);
});

trainerRouter.get('/api/trainers/:id', function(req, res, next){
  debug('Get /api/trainers/:id');
  Trainer.findById(req.params.id)
  .then((trainer) => {
    res.json(trainer);
  })
  .catch(err => next(createError(404, err.message)));
});

trainerRouter.get('/api/trainers', function(req, res,next){
  debug('Get /api/trainers/');
  Trainer.find({})
  .then((trainer) => {
    res.json(trainer);
  })
  .catch(err => next(createError(404), err.message));
});

trainerRouter.delete('/api/trainers/:id', function(req, res, next){
  debug('Delete /api/trainers/:id');
  Trainer.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(err => next(createError(404, err.message)));
});
