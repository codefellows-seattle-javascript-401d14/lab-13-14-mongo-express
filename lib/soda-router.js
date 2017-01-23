'use strict';

const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const sodaRouter = module.exports = new Router();
const Soda = require('../model/soda.js');
const createError = require('http-errors');
const debug = require('debug')('Sodaapp:server');

//**********POST ROUTER ****************
sodaRouter.post('/api/soda', jsonParser, function(req, res, next){
  debug('POST /api/soda');
  new Soda(req.body).save()
.then(soda => res.json(soda))
.catch(next);
});

//***********GET ROUTER **************
sodaRouter.get('/api/soda/:id', function (req, res, next){
  Soda.findById(req.params.id)
  .then(soda => res.json(soda))
  .catch(err => next(createError(404, err.message)));
});

//************DELETE ROTUER***************
sodaRouter.delete('/api/soda/:id', function (req, res, next){
  Soda.findById(req.params.id)
  .then(soda => res.status(204).json(soda))
  .catch(err => next(createError(404, err.message)));
});
