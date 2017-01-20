'use strict';

require('./mock-env.js');


const superagent = require('superagent'); // AJAX library
const expect = require('chai').expect;


const Thundercat = require('../model/thundercat.js');

require('../server.js');

const baseURL = `http://localhost:${process.env.PORT}`;

describe('testing thundercat router', function(){
  afterEach((done) => {
    Thundercat.remove({})
    .then(() => done())
    .catch(done);
  });

  describe('testing POST /api/thundercats', function(){
    it('should return a thundercat', (done) => {
      superagent.post(`${baseURL}/api/thundercats`)
      .send({name: 'lion-o', origin: 'thundera', group: 'thundercats', weapon: 'sword'})
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('lion-o');
        expect(res.body.origin).to.equal('thundera');
        expect(res.body.group).to.equal('thundercats');
        expect(res.body.weapon).to.equal('sword');
        expect(Boolean(res.body.created)).to.equal(true);
        done();
      })
      .catch(done);
    });

    it('should return a 400 status', (done) => {
      superagent.post(`${baseURL}/api/thundercats`)
     .send({})
     .then(done)
     .catch(err => {
       expect(err.status).to.equal(400);
       done();
     })
     .catch(done);
    });
  });

  describe('testing GET /api/thundercats/:id', function(){
    beforeEach(done => {
      new Thundercat({name: 'snarf',origin: 'thundera', group: 'thundercats', weapon: 'none'}).save()
     .then(thundercat => {
       this.tempKitty = thundercat;
       done();
     })
     .catch(done);
    });

    it('should return a thundercat', (done) => {
      superagent.get(`${baseURL}/api/thundercats/${this.tempKitty._id}`)
     .then(res => {
       expect(res.status).to.equal(200);
       expect(res.body._id).to.equal(this.tempKitty._id.toString());
       expect(res.body.name).to.equal('snarf');
       expect(res.body.origin).to.equal('thundera');
       expect(res.body.group).to.equal('thundercats');
       expect(res.body.weapon).to.equal('none');
       expect(Boolean(res.body.created)).to.equal(true);
       done();
     })
     .catch(done);
    });

    it('should return a 404 on account of no thundercat', (done) => {
      superagent.get(`${baseURL}/api/thundercats/12848354`)
     .then(done)
     .catch(err => {
       expect(err.status).to.equal(404);
       done();
     })
     .catch(done);
    });
  });

  describe('testing DELETE /api/thundercats/:id', function(){
    beforeEach(done => {
      new Thundercat({name: 'snarf',origin: 'thundera', group: 'thundercats', weapon: 'none'}).save()
      .then(thundercat => {
        this.tempKitty = thundercat;
        done();
      })
      .catch(done);
    });
    it('should mumrah a thundercat', (done) => {
      superagent.delete(`${baseURL}/api/thundercats/${this.tempKitty._id}`)
      .then(res => {
        expect(res.status).to.equal(204);
        done();
      })
      .catch(done);
    });
    it('should return 404 status', (done) => {
      superagent.delete(`${baseURL}/api/thundercats/127833`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
});
