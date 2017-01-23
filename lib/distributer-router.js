const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const distributerRouter = module.exports = new Router();
const Distributer = require('../model/distributers.js');
// const Soda = require('../model/soda.js');
// const createError = require('http-errors');
const debug = require('debug')('Sodaapp:server');

//**************POST ROUTER***********************
distributerRouter.post('/api/distributer', jsonParser, function(res, req, next){
  debug('POST /api/distributer');
  new Distributer().save()
  .then(distributer => res.json(distributer))
  .catch(next);
});
//***************GET ROUTER*******************
