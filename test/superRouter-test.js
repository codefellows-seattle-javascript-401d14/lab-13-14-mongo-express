'use strict';

require('./mockEnv');
const superagent = require('superagent');
const expect = require('chai').expect;
const Superhero = require('../model/Superhero');
const baseURL = `http://localhost:${process.env.PORT}`;
require('../server');

describe('testing superRouter', function() {
  afterEach((done) => {
    Superhero.remove({})
    .then(() => done())
    .catch(done);
  });
  describe('testing POST /api/superheroes', function() {
    it('should create a superhero', (done) => {
      superagent.post(`${baseURL}/api/superheroes`)
      .send({
        name: 'Superman',
        power: 'flight',
      })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Superman');
        expect(res.body.power).to.equal('flight');
        expect(Boolean(res.body.createdAt)).to.equal(true);
        done();
      })
      .catch(done);
    });
    it('should return 400 status', done => {
      superagent.post(`${baseURL}/api/superheroes`)
        .send({})
        .then(done)
          .catch(res => {
            expect(res.status).to.equal(400);
            done();
          })
          .catch(done);
    });
  });

  describe('testing GET /api/superheroes/:id', function() {
    beforeEach(done => {
      new Superhero({name: 'Superman', power: 'flight'}).save()
        .then(superhero => {
          this.tempHero = superhero;
          done();
        })
        .catch(done);
    });
    it('should return a superhero', done => {
      superagent.get(`${baseURL}/api/superheroes/${this.tempHero._id}`)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body._id).to.equal((this.tempHero._id).toString());
          expect(res.body.name).to.equal('Superman');
          expect(res.body.power).to.equal('flight');
          expect(Boolean(res.body.createdAt)).to.equal(true);
          done();
        })
      .catch(done);
    });
    it('should return a 404 due to bad id', (done) => {
      superagent.get(`${baseURL}/api/superheroes/13`)
        .then(done)
          .catch(res => {
            expect(res.status).to.equal(404);
            done();
          })
          .catch(done);
    });
  });
  describe('testing DELETE /api/superheroes/:id', function() {
    before(done => {
      new Superhero({name: 'Superman', power: 'flight'}).save()
        .then(superhero => {
          this.tempHero = superhero;
          done();
        })
        .catch(done);
    });
    it('should delete a superhero', (done) => {
      superagent.delete(`${baseURL}/api/superheroes/${this.tempHero._id}`)
        .then(res => {
          expect(res.status).to.equal(204);
          done();
        })
        .catch(done);
    });
    it('should return 404 status', (done) => {
      superagent.delete(`${baseURL}/api/superheroes/13`)
        .then(done)
        .catch(res => {
          expect(res.status).to.equal(404);
          done();
        })
        .catch(done);
    });
  });
  describe('testing GET /api/superheroes', function(){
    before(done => {
      new Superhero({name: 'Superman', power: 'flight'}).save()
      .then(superhero => {
        this.tempHero = superhero;
        done();
      })
      .catch(done);
    });
    it('should return all superheroes', (done) => {
      superagent.get(`${baseURL}/api/superheroes`)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.instanceof(Array);
          expect(res.body[0]._id).to.equal(this.tempHero._id.toString());
          done();
        })
        .catch(done);
    });
    it('should return a 404 due to bad resource', (done) => {
      superagent.get(`${baseURL}/api/superhero/13`)
        .then(done)
        .catch(res => {
          expect(res.status).to.equal(404);
          done();
        })
        .catch(done);
    });
  });
});
