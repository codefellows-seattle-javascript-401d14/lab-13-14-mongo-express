'use strict';

const Router = require('express').Router;
const Device = require('../model/device.js');
const parseJSON = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('gameapp:device-router');

const deviceRouter = module.exports = new Router();

deviceRouter.post('/api/devices', parseJSON, function(req, res, next) {
  debug('POST /api/devices');
  new Device(req.body).save()
  .then(device => res.json(device))
  .catch(next);
});

deviceRouter.get('/api/devices/:id', function(req, res, next) {
  debug('GET /api/devices/:id');
  Device.findById(req.params.id)
  .populate('games')
  .then(device => res.json(device))
  .catch(err => next(createError(404, err.message)));
});

deviceRouter.get('/api/devices', function(req, res, next) {
  debug('GET /api/devices');
  Device.find({})
  .populate('games')
  .then(devices => res.json(devices))
  .catch(err => next(createError(404, err.message)));
});

deviceRouter.delete('/api/devices/:id', function(req, res, next) {
  debug('DELETE /api/devices/:id');
  Device.findByIdAndRemove(req.params.id)
  .then(() => res.status(204).send())
  .catch(err => next(createError(404, err.message)));
});
