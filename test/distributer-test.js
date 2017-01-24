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
    it.only('should respond with a distributer', (done) => {
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
      console.log(this.fakeSoda);
    });  //end of it block
  });


});
