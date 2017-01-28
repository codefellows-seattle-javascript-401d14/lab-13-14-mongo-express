'use strict';
require('./mock-env');
const expect = require('chai').expect;
const superagent = require('superagent');
const Distributer = require('../model/distributers.js');
const Soda = require('../model/soda.js');
require('../server');
const baseURL = `http://localhost:${process.env.PORT}`;

//**************POST  TEST***************************

describe('testing distributer router', function(){
  afterEach((done) => {
    Promise.all([
      Distributer.remove({}),
      Soda.remove({}),
    ])
    .then( () => done())
    .catch(done);
  });
  describe('testing POST api', function(){
    //make a soda before we make a distributer(i.e. make a parent before a child since they are dependant on each other)
    beforeEach( (done) => {
      new Soda ({
        brand: 'Sprite',
        calories: 200,
        diet: false,
        taste: 'quite refreshing',
      }).save()
    .then(soda => {
      this.fakeSoda = soda;
      done();
    })
    .catch(done);
    });
    it('should respond with a distributer', (done) => {
      superagent.post(`${baseURL}/api/distributer`)
      .send({
        company: 'Whole Foods',
        numberofStores: 2354,
        Seattle: true,
        sodaID: this.fakeSoda._id.toString(),
      })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.company).to.equal('Whole Foods');
        expect(res.body.numberofStores).to.equal(2354);
        expect(res.body.Seattle).to.equal(true);
        expect(res.body.sodaID).to.equal(this.fakeSoda._id.toString());
        done();
      })
      .catch(done);
      // console.log(this.fakeSoda);
    });  //end of it block
    it('should return a 400 status',(done) => {
      superagent.post(`${baseURL}/api/distributer`)
      .send({
        company: 'QFC',
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

//**************GET  TEST***************************
describe('testing GET api/distributer/:id', function() {
  beforeEach((done)=>{
    new Soda ({
      brand: 'Barges',
      calories: 250,
      diet: false,
      taste: 'my favorite',
    }).save()
    .then(soda => {
      this.tempSoda = soda;
      return new Distributer({
        company: 'SafeWay',
        numberofStores: 2234,
        Seattle: true,
        sodaID: this.tempSoda._id.toString(),
      })
    .save();
    })
    .then(distributer => {
      this.tempDistributer = distributer;
      done();
    })
    .catch(done);
  });
  it('should return a 200 status with valid distributer ID', (done) => {
    superagent.get(`${baseURL}/api/distributer/${this.tempDistributer._id}`)
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res.body._id).to.equal(this.tempDistributer._id.toString());
      expect(res.body.company).to.equal(this.tempDistributer.company);
      expect(res.body.numberofStores).to.deep.equal(this.tempDistributer.numberofStores);
      expect(res.body.Seattle).to.equal(this.tempDistributer.Seattle);
      expect(res.body.taste).to.equal(this.tempDistributer.taste);
      done();
    })
    .catch(done);
  });//end of it block
  it.only('should return a 404 because of bad id', (done) => {
    superagent.get(`${baseURL}/api/distributer/badID345345`)
    .then(done)
    .catch(err => {
      expect(err.status).to.equal(404);
      done();
    })
    .catch(done);
  });
});
