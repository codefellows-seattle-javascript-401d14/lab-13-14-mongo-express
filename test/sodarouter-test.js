'use strict';
require('./mock-env');

const expect = require('chai').expect;
const superagent = require('superagent');
const Soda = require('../model/soda.js');
require('../server');
const baseURL = `http://localhost:${process.env.PORT}`;

//*****************POST TESTING************************
describe('should return a soda with a valid ID', function(){
  afterEach((done) => {
    Soda.remove({})
    .then( () => done())
    .catch(done);
  });
  describe('testing /api/soda', function(){

    it('should return a soda with valid body',(done) => {
      superagent.post(`${baseURL}/api/soda`)
      .send({
        brand: 'RC',
        calories: 230,
        diet: false,
        taste: 'too sweet',
      })
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res.body.brand).to.equal('RC');
      expect(res.body.calories).to.equal(230);
      expect(res.body.diet).to.equal(false);
      expect(res.body.taste).to.equal('too sweet');
      done();
    })
    .catch(done);
    }); //end of it block
    it('should return a 400 status',(done) => {
      superagent.post(`${baseURL}/api/soda`)
      .send({
        // brand: 'RC',
        // calories: 230,
        // diet: true,
        // taste: 'too sweet',
      })
    .then(done)
    .catch(err => {
      expect(err.status).to.equal(400);
      done();
    })
    .catch(done);
    }); //end of it block
  });
});
