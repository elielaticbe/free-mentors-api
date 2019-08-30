/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

describe('Mentors tests', () => {
  it('should be able to view all mentors ', (done) => {
    chai.request(app).get('/api/v1/mentor/mentors')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should not be able to view all mentors when mentor exists ', (done) => {
    const mentorId = 1;
    chai.request(app).get(`/api/v1/mentor/mentors/${mentorId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should be not able to view a mentor when mentor not found ', (done) => {
    const mentorId = -1;
    chai.request(app).get(`/api/v1/mentor/mentors/${mentorId}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });
});
