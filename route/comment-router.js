'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('commentapp:comment-router');
const createError = require('http-errors');

const Comment = require('../model/comment.js');
// const Sport = require('../model/sport.js');

const commentRouter = module.exports = new Router();

commentRouter.post('/api/comments', jsonParser, function(req, res, next){
  debug('POST /api/comments');
  new Comment(req.body).save()
  .then(comment => res.json(comment))
  .catch(next);
});


commentRouter.get('/api/comments/:id', function(req, res, next){
  debug('GET /api/comments/:id');
  Comment.findById(req.params.id)
  .then(comment => res.json(comment))
  .catch(err => next(createError(404, err.message)));
});

commentRouter.delete('/api/comments/:id', function(req, res, next){
  debug('DELETE /api/comments/:id');
  Comment.findByIdAndRemove(req.params.id)
  .then(() =>  {
    res.status(204).send();
  })

  .catch(err => next(createError(404, err.message)));
});

commentRouter.get('/api/comments/', function(req, res, next){
  debug('GET /api/comments/');
  Comment.find(req.params.id)
  .then(comment => res.json(comment))
  .catch(err => next(createError(404, err.message)));
});
