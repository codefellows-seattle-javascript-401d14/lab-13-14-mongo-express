'use strict';

require('./mock-env.js');

const expect = require('chai').expect;
const superagent = require('superagent');

const Thundercat = require('../model/thundercat');
const Character = require('../model/character');

const baseURL = `http://localhost:${process.env.PORT}`;

require('../server.js');

describe('testing character router', function(){
  afterEach((done) => {
    Promise.all([
      Thundercat.remove({}),
      Character.remove({}),
    ])
    .then(() => done())
    .catch(done);
  });

  describe('testing POST /api/characters', function(){
    beforeEach((done) => {
      new Thundercat ({name: 'lion-o', origin: 'thundera', group: 'thundercats', weapon: 'sword'}).save()
    .then(thundercat => {
      this.tempKitty = thundercat;
      done();
    })
    .catch(done);
    });

    it('should respond with a character', (done) => {
      superagent.post(`${baseURL}/api/characters`)
      .send({
        name: 'lion-o',
        origin: 'thundera',
        group: 'thundercats',
        weapon: 'sword',
        thundercatID: this.tempKitty._id.toString(),
      })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('lion-o');
        expect(Boolean(res.body._id)).to.equal(true);
        expect(res.body.origin).to.equal('thundera');
        expect(res.body.group).to.equal('thundercats');
        expect(res.body.weapon).to.equal('sword');
        done();
      })
      .catch(done);
    });
    it('should respond with a thundercat', (done) => {
      superagent.post(`${baseURL}/api/characters`)
      .send({
        name: 'lion-not',
      })
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(400);
        done();
      })
      .catch(done);
    });
  });

  describe('testing GET /api/characters/:id', function(){
    beforeEach((done) => {
      new Thundercat({name: 'snarf',origin: 'thundera', group: 'thundercats', weapon: 'none'}).save()
    .then(thundercat => {
      this.tempKitty = thundercat;
      return new Character({
        name: 'snarf',
        origin: 'thundera',
        group: 'thundercats',
        weapon: 'none',
        thundercatID: this.tempKitty._id.toString(),
      }).save();
    })
    .then(character => {
      this.tempKitty = character;
      done();
    })
    .catch(done);
    });
    it('should respond with a thundercat', (done) => {
      superagent.get(`${baseURL}/api/characters/${this.tempKitty._id}`)
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res.body._id.toString()).to.equal(this.tempKitty._id.toString());
      expect(res.body.name).to.equal('snarf');
      expect(res.body.origin).to.equal('thundera');
      expect(res.body.group).to.equal('thundercats');
      expect(res.body.weapon).to.equal('none');
      done();
    })
    .catch(done);
    });

    it('should return a 404 on account of no character', (done) => {
      superagent.get(`${baseURL}/api/characters/12848354`)
   .then(done)
   .catch(err => {
     expect(err.status).to.equal(404);
     done();
   })
   .catch(done);
    });
  });

  describe('testing DELETE /api/characters', function() {
    beforeEach(done => {
      new Thundercat({name: 'cheetara',origin: 'thundera', group: 'thundercats', weapon: 'staff'}).save()
      .then(thundercat => {
        this.tempKitty = thundercat;
        return new Character({
          name: 'cheetara',
          origin: 'thundera',
          group: 'thundercats',
          weapon: 'staff',
          thundercatID: this.tempKitty._id.toString(),
        }).save();
      })
      .then(character => {
        this.tempCharacter = character;
        done();
      })
      .catch(done);
    });

    it('should mumrah a character', (done) => {
      superagent.delete(`${baseURL}/api/characters/${this.tempCharacter._id}`)
      .then(res => {
        expect(res.status).to.equal(204);
        done();
      })
      .catch(done);
    });

    it('should return 404 status', (done) => {
      superagent.delete(`${baseURL}/api/characters/mumrah`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });


  console.log('THUNDER, THUNDER, THUNDER, THUNDERCATS, HOOOOO!!!!');

});
