'use strict';

require('./test-env.js');

const expect = require('chai').expect;
const superagent = require('superagent');

const Trainer = require('../model/trainer.js');

require('../server.js');

const apiURL = `http://localhost:${process.env.PORT}`;

describe('Testing trainer router', function(){
  afterEach((done) => {
    Trainer.remove({})
    .then(() => done())
    .catch(done);
  });

  describe('Testing POST with invaild endpoint', function(){
    it('should return status code of 404 ', (done) => {
      superagent.post(`${apiURL}/api/test`)
      .send({name:'test'})
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
  describe('Testing POST with invaild body', function(){
    it('should return status code of 400', (done) => {
      superagent.post(`${apiURL}/api/trainers`)
      .send({})
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(400);
        done();
      })
      .catch(done);
    });
  });

  describe('Testing POST with vaild body', function(){
    it('should return status code of 200', (done) => {
      superagent.post(`${apiURL}/api/trainers`)
      .send({
        name:'Ash Ketchum',
        age:16,
        hometown: 'Pallet Town',
        numOfPokemon: 4,
      })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Ash Ketchum');
        expect(res.body.age).to.equal(16);
        expect(res.body.hometown).to.equal('Pallet Town');
        expect(res.body.numOfPokemon).to.equal(4);
        done();
      })
      .catch(done);
    });
  });

  describe('Testing GET with invaild id', function(){
    it('should return status code of 404', (done) => {
      superagent.get(`${apiURL}/api/trainers/666`)
      .send({})
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
  describe('Testing GET with vaild id', function(){
    before(done => {
      new Trainer({
        name: 'Brock',
        age: 17,
        numOfPokemon: 44,
      }).save()
     .then(trainer => {
       this.tempTrainer = trainer;
       done();
     })
     .catch(done);
    });
    it('should return status code of 200', (done) => {
      superagent.get(`${apiURL}/api/trainers/${this.tempTrainer._id}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Brock');
        done();
      })
      .catch(done);
    });
  });
  describe('Testing DELETE with invaild id', function(){
    it('should return status code of 404', (done) => {
      superagent.delete(`${apiURL}/api/trainers/77`)
      .send({})
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
  describe('Testing DELETE with vaild id', function(){
    before(done => {
      new Trainer({
        name: 'Brock',
        age: 17,
        numOfPokemon: 44,
      }).save()
     .then(trainer => {
       this.tempTrainer = trainer;
       done();
     })
     .catch(done);
    });
    it('should return status code of 200', (done) => {
      superagent.delete(`${apiURL}/api/trainers/${this.tempTrainer._id}`)
      .then(res => {
        expect(res.status).to.equal(204);
        done();
      })
      .catch(done);
    });
  });


});
