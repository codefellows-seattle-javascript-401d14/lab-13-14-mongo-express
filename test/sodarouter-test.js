'use strict';
require('./mock-env');

const expect = require('chai').expect;
const superagent = require('superagent');
const Soda = require('../model/soda.js');
require('../server');
const baseURL = `http://localhost:${process.env.PORT}`;

//*****************POST TESTING************************
describe('Testing Post route', function(){
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
        brand: 'RC',
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

//*************GET TEST**************************
describe('testing GET Route', function(){
  beforeEach((done) => {
    new Soda ({
      brand: 'Diet Pepsi',
      calories: 1,
      diet: true,
      taste: 'ewwwww',
    }).save()
    .then(soda => {
      this.fakeSoda = soda;
      done();
    })
    .catch(done);
  });
  it('should return a soda with valid ID', (done) => {
    superagent.get(`${baseURL}/api/soda/${this.fakeSoda._id}`)
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res.body._id).to.equal(this.fakeSoda._id.toString());
      expect(res.body.brand).to.equal('Diet Pepsi');
      expect(res.body.calories).to.equal(1);
      expect(res.body.diet).to.equal(true);
      expect(res.body.taste).to.equal('ewwwww');
      done();
    })
    .catch(done);
  });//end of it block
  it('should return a 404 because of bad id', (done) => {
    superagent.get(`${baseURL}/api/soda/123234`)
    .then(done)
    .catch(err => {
      expect(err.status).to.equal(404);
      done();
    })
    .catch(done);
  });
});
//*******************DELETE TEST********************
describe('testing DELETE Route', function(){
  beforeEach((done) => {
    new Soda ({
      brand: 'Diet Pepsi',
      calories: 1,
      diet: true,
      taste: 'ewwwww',
    }).save()
    .then(soda => {
      this.fakeSoda = soda;
      done();
    })
    .catch(done);
  });
  it('should delete a soda with valid ID', (done) =>{
    superagent.delete(`${baseURL}/api/soda/${this.fakeSoda._id}`)
    .then(res => {
      expect(res.status).to.equal(204);
      done();
    })
    .catch(done);
  });
  it('should respond with 404 if bad delete', (done) => {
    superagent.delete(`${baseURL}/api/soda/123234`)
    .then(done)
    .catch(err => {
      expect(err.status).to.equal(404);
      done();
    })
    .catch(done);
  });
});
