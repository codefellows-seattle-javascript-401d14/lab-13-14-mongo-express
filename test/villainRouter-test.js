'use strict';

require('./mockEnv');
const expect = require('chai').expect;
const superagent = require('superagent');
const Super = require('../model/Superhero');
const Villain = require('../model/Villain');
const baseURL = `http://localhost:${process.env.PORT}`;
require('../server');


describe('testing villainRouter', function() {
  afterEach((done) => {
    Promise.all([
      Super.remove({}),
      Villain.remove({}),
    ])
    .then(() => done())
    .catch(done);
  });
  describe('testing POST /api/villains', function() {
    beforeEach((done) => {
      new Super({name: 'Superman', power: 'flight'}).save()
      .then(superhero => {
        this.tempHero = superhero;
        done();
      })
      .catch(done);
    });
    it('should create a villain', (done) => {
      superagent.post(`${baseURL}/api/villains`)
      .send({
        name: 'Joker',
        power: 'comedy',
        superId: this.tempHero._id.toString(),
      })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Joker');
        expect(res.body.power).to.equal('comedy');
        expect(Boolean(res.body.createdAt)).to.equal(true);
        done();
      })
      .catch(done);
    });
    it('should return 400 status', done => {
      superagent.post(`${baseURL}/api/villains`)
      .send({})
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(400);
        done();
      })
      .catch(done);
    });
  });
  describe('testing GET /api/villains/:id', function() {
    beforeEach(done => {
      new Super({name: 'Superman', power: 'flight'}).save()
      .then(superhero => {
        this.tempHero = superhero;
        return new Villain({name: 'Joker', power: 'comedy', superId: this.tempHero._id.toString()}).save();
      })
      .then(villain => {
        this.tempVillain = villain;
        done();
      })
      .catch(done);
    });
    it('should return a villain', done => {
      superagent.get(`${baseURL}/api/villains/${this.tempVillain._id}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body._id).to.equal((this.tempVillain._id).toString());
        expect(res.body.name).to.equal('Joker');
        expect(res.body.power).to.equal('comedy');
        expect(Boolean(res.body.createdAt)).to.equal(true);
        done();
      })
      .catch(done);
    });
    it('should return a 404 due to bad id', (done) => {
      superagent.get(`${baseURL}/api/villains/13`)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
  describe('testing DELETE /api/villains/:id', function() {
    beforeEach(done => {
      new Super({name: 'Superman', power: 'flight'}).save()
      .then(superhero => {
        this.tempHero = superhero;
        return new Villain({name: 'Joker', power: 'comedy', superId: this.tempHero._id.toString()}).save();
      })
      .then(villain => {
        this.tempVillain = villain;
        done();
      })
      .catch(done);
    });
    it('should delete a villain', (done) => {
      superagent.delete(`${baseURL}/api/villains/${this.tempVillain._id}`)
      .then(res => {
        expect(res.status).to.equal(204);
        done();
      })
      .catch(done);
    });
    it('should return 404 status', (done) => {
      superagent.delete(`${baseURL}/api/villains/13`)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
  describe('testing GET /api/villains', function(){
    beforeEach(done => {
      new Super({name: 'Superman', power: 'flight'}).save()
      .then(superhero => {
        this.tempHero = superhero;
        return new Villain({name: 'Joker', power: 'comedy', superId: this.tempHero._id.toString()}).save();
      })
      .then(villain => {
        this.tempVillain = villain;
        done();
      })
      .catch(done);
    });
    it('should return all villains', (done) => {
      superagent.get(`${baseURL}/api/villains`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.instanceof(Array);
        expect(res.body[0]._id).to.equal(this.tempVillain._id.toString());
        done();
      })
      .catch(done);
    });
    it('should return a 404 due to bad resource', (done) => {
      superagent.get(`${baseURL}/api/villains/13`)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
});
