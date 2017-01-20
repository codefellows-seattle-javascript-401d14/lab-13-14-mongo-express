'use strict';

require('./mockEnv');
const expect = require('chai').expect;
const superagent = require('superagent');
const Super = require('../model/Superhero');
const Villain = require('../model/Villain');
const baseURL = `http://localhost:${process.env.PORT}`;
require('../server');


describe('testing villainRouter', function() {
  let tempHero = {
    name: 'Batman',
    power: 'weatlh',
  };

  afterEach(done => {
    Promise.all([
      Super.remove({}),
      Villain.remove({}),
    ])
    .then(() => done())
    .catch(done);
  });
  describe('testing POST /api/villains', function() {
    beforeEach((done) => {
      new Super(tempHero).save()
       .then(superhero => {
         this.tempHero = superhero;
         done();
       })
       .catch(done);
    });
    let tempVillain = {
      name: 'Joker',
      power: 'comedy',
      superfk_id: this.tempHero._id.toString(),
    };
    it('should create an villain', done => {
      superagent.post(`${baseURL}/api/villains`)
      .send(tempVillain)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Batman');
        expect(res.body.power).to.equal('weatlh');
        expect(Boolean(res.body._id)).to.equal(true);
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
    beforeEach((done) => {
      new Super(tempHero).save()
       .then(superhero => {
         this.tempHero = superhero;
         return new Villain(tempVillain).save();
       })
      .then(villain => {
        this.tempVillain = villain;
        done();
      })
      .catch(done);
    });
    it('should return a villain', (done) => {
      superagent.get(`${baseURL}/api/villains/${this.tempVillain._id}`)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body.superfk_id).to.equal((this.tempHero._id).toString());
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
          .catch(err => {
            expect(err.status).to.equal(404);
            done();
          })
          .catch(done);
    });
  });
  describe('testing DELETE /api/villains/:id', function() {
    beforeEach(done => {
      this.tempVillain = new Villain(tempVillain).save()
        .then(villain => {
          this.tempVillain = villain;
          done();
        })
        .catch(done);
    });
    it('should delete an villain', (done) => {
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
        .catch(err => {
          expect(err.status).to.equal(404);
          done();
        })
        .catch(done);
    });
  });
  describe('testing GET /api/villains', function(){
    beforeEach(done => {
      this.tempVillain = new Villain(tempVillain).save()
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
          console.log(this.tempVillain._id);
          console.log(res.body[0]._id);
          expect(res.body[0]._id).to.equal(this.tempVillain._id.toString());
          done();
        })
        .catch(done);
    });
    it('should return a 404 due to bad resource', (done) => {
      superagent.get(`${baseURL}/api/villain/22`)
        .then(done)
        .catch(err => {
          expect(err.status).to.equal(404);
          done();
        })
        .catch(done);
    });
  });
});
