const chai = require('chai');
const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should();
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const db = require('../database/index.js');
const app = require('../server/index.js');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// TEST CREATE API ON COURSE LEVEL
it('it should CREATE a new course by given courseId', (done) => {
  chai.request('http://127.0.0.1:9800')
    .post('/Create/course/item/?courseId=102')
    .end((err, res) => {
      res.should.have.status(200);
      res.text.should.be.a('string');
      expect(res.text).to.equal('Course with courseId 102 has been added successfully.');
      done();
    });
});

// TEST READ API ON COURSE LEVEL
it('it should READ the course information by given courseId', (done) => {
  chai.request('http://127.0.0.1:9800')
    .get('/Read/course/item/?courseId=1')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      expect(res.body.courseId).to.equal(1);
      done();
    });
});

// TEST UPDATE API ON COURSE LEVEL
it('it should UPDATE the course information by given courseId and sent data', (done) => {
  chai.request('http://127.0.0.1:9800')
    .put('/Update/course/item/?courseId=102')
    .send({
      courseId: 102,
      update: {totalQuizzes: 67 }
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.text.should.be.a('string');
      expect(res.text).to.equal('Course with courseId 102 has been successfully updated.');
      done();
    });
});

it ('it should have 67 for totalQuizzes', (done) => {
  chai.request('http://127.0.0.1:9800')
    .get('/Read/course/item/?courseId=102')
    .end((err, res) => {
      res.should.have.status(200);
      expect(res.body.courseId).to.equal(102);
      expect(res.body.totalQuizzes).to.equal(67);
      done();
    });
});

// TEST DELETE API ON COURSE LEVEL

it('it should DELETE the course information by given courseId', (done) => {
  chai.request('http://127.0.0.1:9800')
    .delete('/Delete/course/item/?courseId=12')
    .end((err, res) => {
      res.should.have.status(200);
      res.text.should.be.a('string');
      expect(res.text).to.equal('Course with courseId 12 has been successfully deleted.');
      done();
    });
});

it ('it should not GET any information for the removed course', (done) => {
  chai.request('http://127.0.0.1:9800')
    .get('/Read/course/item/?courseId=12')
    .end((err, res) => {
      res.should.have.status(200);
      expect(res.body).to.equal('');
      done();
    });
});