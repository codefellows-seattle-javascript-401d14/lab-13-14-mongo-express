'use strict';

const Router = require('express').Router;
const Game = require('../model/game.js');
const parseJSON = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('gameapp:game-router');

const gameRouter = module.exports = new Router();

gameRouter.post('/api/games', parseJSON, function(req, res, next) {
  debug('POST /api/games');
  new Game(req.body).save()
  .then(game => res.json(game))
  .catch(next);
});

gameRouter.get('/api/games/:id', function(req, res, next) {
  debug('GET /api/games');
  Game.findById(req.params.id)
  .then(game => res.json(game))
  .catch(err => next(createError(404, err.message)));
});
