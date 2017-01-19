'use strict';

//require in the mock env
require('./mock-env.js');

//require npm modules
const expect = require('chai').expect;
const superagent = require('superagent');

//require app modules
const Sport = require('../model/sport.js');

//start server
require('../server.js');

//create test vars
const baseURL = `http://localhost:${process.env.PORT}`;

describe('testing sport router', function(){
  afterEach((done) => {
    Sport.remove({})
    .then(() => done())
    .catch(done);
  });
  describe('testing POST /api/sports', function(){
    it('should return a sport', (done) => {
      superagent.post(`${baseURL}/api/sports`)
      .send({sport: 'football', announcer: 'john lynch', network: 'fox'})
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.announcer).to.equal('john lynch');
        expect(res.body.network).to.equal('fox');
        expect(res.body.sport).to.equal('football');
        expect(Boolean(res.body.created)).to.equal(true);
        done();
      })
      .catch(done);
    });

    it('should return 400 status', (done) => {
      superagent.post(`${baseURL}/api/sports`)
      .send({})
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(400);
        done();
      })
      .catch(done);
    });
  });

  describe('testing GET /api/sports/:id', function(){
    beforeEach(done => {
      new Sport({sport: 'football', announcer: 'john lynch', network: 'fox'}).save()
        .then(sport => {
          this.tempSport = sport;
          done();
        })
        .catch(done);
    });
    it('should return a sport', (done) => {
      console.log(this.tempSport);
      superagent.get(`${baseURL}/api/sports/${this.tempSport._id}`)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body._id).to.equal(this.tempSport._id.toString());
          expect(res.body.sport).to.equal('football');
          expect(res.body.announcer).to.equal('john lynch');
          expect(res.body.network).to.equal('fox');
          expect(Boolean(res.body.created)).to.equal(true);
          done();
        })
        .catch(done);
    });

    it('should return a 404 due to bad id', (done) => {
      superagent.get(`${baseURL}/api/sports/34343`)
        .then(done)
        .catch(err => {
          expect(err.status).to.equal(404);
          done();
        })
        .catch(done);
    });
  });
});



describe('testing DELETE /api/sports', function(){
  beforeEach(done => {
    new Sport({sport: 'football', announcer: 'john lynch', network: 'fox'}).save()
    .then(sport => {
      this.tempSport = sport;
      done();
    })
    .catch(done);
  });
  afterEach((done) => {
    Sport.remove({})
    .then(() => done())
    .catch(done);
  });

  it('should delete a sport', (done) => {
    superagent.delete(`${baseURL}/api/sports/${this.tempSport._id}`)
    .then(res => {
      expect(res.status).to.equal(204);
      done();
    })
    .catch(done);
  });

  it('should return 404 status', (done) => {
    superagent.delete(`${baseURL}/api/sports/54321`)
    .then(done)
    .catch(err => {
      expect(err.status).to.equal(404);
      done();
    })
    .catch(done);
  });
});


describe('testing GET find /api/sports/', function(){
  before(done => {
    new Sport({sport: 'football', announcer: 'john lynch', network: 'fox'}).save()
      .then(sport => {
        this.tempSport = sport;
        done();
      })
      .catch(done);
  });
  afterEach((done) => {
    Sport.remove({})
    .then(() => done())
    .catch(done);
  });
  it('should return all data sport', (done) => {
    superagent.get(`${baseURL}/api/sports`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.instanceof(Array);
        console.log(this.tempSport._id);
        console.log(res.body[0]._id);
        expect(res.body[0]._id).to.equal(this.tempSport._id.toString());
        done();
      })
      .catch(done);
  });

  it('should return a 404 due to bad enpoint', (done) => {
    superagent.get(`${baseURL}/api/sportwut`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
  });
});
