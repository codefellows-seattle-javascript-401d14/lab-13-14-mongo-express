'use strict';

require('./mock-env.js');
const expect = require('chai').expect;
const superagent = require('superagent');

const Brewery = require('../model/brewery.js');

require('../server.js');
const baseURL = `http://localhost:${process.env.PORT}`;


describe('testing brewery router', function() {
  afterEach((done) => {
    Brewery.remove({})
    .then(() => done())
    .catch(done);
  });

  describe('testing POST /api/breweries', function () {
    it('should create a brewery', (done) => {
      superagent.post(`${baseURL}/api/breweries`)
      .send({
        nameOfBrewery: 'Cloudburst',
        nameOfBeer: 'Humble Mumble IPA',
        typeOfBeer: 'IPA',
        percentOfBeer: 7.4,
      })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.nameOfBrewery).to.equal('Cloudburst');
        expect(res.body.nameOfBeer).to.equal('Humble Mumble IPA');
        expect(res.body.typeOfBeer).to.equal('IPA');
        expect(res.body.percentOfBeer).to.equal(7.4);
        expect(Boolean(res.body.created)).to.equal(true);
        done();
      })
      .catch(done);
    });
  });

  it('should return a 400 status', (done) => {
    superagent.post(`${baseURL}/api/breweries`)
    .send({})
    .then(done)
    .catch(err => {
      expect(err.status).to.equal(400);
      done();
    })
    .catch(done);
  });
});

describe('test GET /api/breweries/:id', function() {
  beforeEach(done => {
    new Brewery({
      nameOfBrewery: 'randomBrewery',
      nameOfBeer: 'randomBeer',
      typeOfBeer: 'any',
      percentOfBeer: 0.0,
    }).save()
    .then(brewery => {
      this.tempbrewery = brewery;
      done();
    })
    .catch(done);
  });

  it('should return a brewery', (done) => {
    superagent.get(`${baseURL}/api/breweries/${this.tempbrewery._id}`)
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res.body._id).to.equal(this.tempbrewery._id.toString());
      expect(res.body.nameOfBrewery).to.equal('randomBrewery');
      expect(res.body.nameOfBeer).to.equal('randomBeer');
      expect(res.body.typeOfBeer).to.equal('any');
      expect(res.body.percentOfBeer).to.equal(0.0);
      expect(Boolean(res.body.created)).to.equal(true);
      done();
    })
    .catch(done);
  });

  it('on bad id should return 404 error', (done) => {
    console.log(this.tempbrewery);
    superagent.get(`${baseURL}/api/brewies/3456`)
    .then(done)
    .catch(err => {
      expect(err.status).to.equal(404);
      done();
    })
    .catch(done);
  });
});

describe('testing DELETE /api/brewies/:id', function() {
  beforeEach(done => {
    new Brewery({
      nameOfBrewery: 'randomBrewery',
      nameOfBeer: 'randomBeer',
      typeOfBeer: 'any',
      percentOfBeer: 0.0,
    }).save()
    .then(brewery => {
      this.tempbrewery = brewery;
      done();
    })
    .catch(done);
  });

  it('should return valid request response with 204 status', (done) => {
    superagent.delete(`${baseURL}/api/breweries/${this.tempbrewery._id}`)
    .then(res => {
      expect(res.status).to.equal(204);
      done();
    })
    .catch(done);
  });

  it('should return a 404 on invalid input', (done) => {
    superagent.delete(`${baseURL}/api/breweries/54321`)
    .then(done)
    .catch(err => {
      expect(err.status).to.equal(404);
      done();
    })
    .catch(done);
  });
});

//BONUS
describe('test GET /api/breweries', function() {
  beforeEach(done => {
    new Brewery({
      nameOfBrewery: 'randomBrewery',
      nameOfBeer: 'randomBeer',
      typeOfBeer: 'any',
      percentOfBeer: 0.0,
    }).save()
    .then(brewery => {
      this.tempbrewery = brewery;
      done();
    })
    .catch(done);
  });

  it('should return all breweries', (done) => {
    superagent.get(`${baseURL}/api/breweries`)
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.instanceof(Array);
      done();
    })
    .catch(done);
  });
  it('on bad id should return 404 error', (done) => {
    superagent.get(`${baseURL}/api/brews`)
    .then(done)
    .catch(err => {
      expect(err.status).to.equal(404);
      done();
    })
    .catch(done);
  });
});
