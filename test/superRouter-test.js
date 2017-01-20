'use strict';

require('dotenv').config();
const superagent = require('superagent');
const expect = require('chai').expect;
const Superhero = require('../model/Superhero');
const baseURL = `http://localhost:${process.env.PORT}`;
require('../server');

describe('testing superRouter', function() {
  let tempHero = {
    name: 'Superman',
    power: 'flight',
  };
  afterEach((done) => {
    Superhero.remove({})
    .then(() => done())
    .catch(done);
  });
  describe('testing POST /api/superheros', function() {
    it('should create an superhero', (done) => {
      superagent.post(`${baseURL}/api/superheros`)
      .send(tempHero)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Superman');
        expect(res.body.power).to.equal('flight');
        expect(Boolean(res.body._id)).to.equal(true);
        done();
      })
      .catch(done);
    });
    it('should return 400 status', done => {
      superagent.post(`${baseURL}/api/superheros`)
        .send({})
        .then(done)
          .catch(err => {
            expect(err.status).to.equal(400);
            done();
          })
          .catch(done);
    });
  });

  describe('testing GET /api/superheros/:id', function() {
    beforeEach(done => {
      new Superhero(tempHero).save()
      .then(superhero => {
        this.tempHero = superhero;
        done();
      })
      .catch(done);
    });
    it('should return a superhero', done => {
      superagent.get(`${baseURL}/api/superheros/${this.tempHero._id}`)
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
      superagent.get(`${baseURL}/api/superheros/13`)
        .then(done)
          .catch(err => {
            expect(err.status).to.equal(404);
            done();
          })
          .catch(done);
    });
  });
  describe('testing DELETE /api/superheros/:id', function() {
    beforeEach(done => {
      this.tempHero = new Superhero({name: 'Superman', power: 'flight'}).save()
        .then(superhero => {
          this.tempHero = superhero;
          done();
        })
        .catch(done);
    });
    afterEach((done) => {
      Superhero.remove({})
        .then(() => done())
        .catch(done);
    });
    it('should delete an superhero', (done) => {
      superagent.delete(`${baseURL}/api/superheros/${this.tempHero._id}`)
        .then(res => {
          expect(res.status).to.equal(204);
          done();
        })
        .catch(done);
    });
    it('should return 404 status', (done) => {
      superagent.delete(`${baseURL}/api/superheros/13`)
        .then(done)
        .catch(err => {
          expect(err.status).to.equal(404);
          done();
        })
        .catch(done);
    });
  });
  describe('testing GET /api/superheros', function(){
    beforeEach(done => {
      this.tempHero = new Superhero({name: 'Superman', power: 'flight'}).save()
      .then(superhero => {
        this.tempHero = superhero;
        done();
      })
      .catch(done);
    });
    afterEach((done) => {
      Superhero.remove({})
        .then(() => done())
        .catch(done);
    });
    it('should return all superheros', (done) => {
      superagent.get(`${baseURL}/api/superheros`)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.instanceof(Array);
          console.log(this.tempHero._id);
          console.log(res.body[0]._id);
          expect(res.body[0]._id).to.equal(this.tempHero._id.toString());
          done();
        })
        .catch(done);
    });
    it('should return a 404 due to bad resource', (done) => {
      superagent.get(`${baseURL}/api/superhero/22`)
        .then(done)
        .catch(err => {
          expect(err.status).to.equal(404);
          done();
        })
        .catch(done);
    });
  });
});
