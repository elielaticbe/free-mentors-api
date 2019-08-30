/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

describe('MentorShip Session Request tests', () => {
  it('should be able to create mentorship session ', (done) => {
    chai.request(app).post('/api/v1/session/')
      .send({
        mentorId: 1,
        questions: 'questions',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should not be able to create mentorship session when its done twice', (done) => {
    chai.request(app).post('/api/v1/session')
      .send({
        mentorId: 1,
        questions: 'questions',
      })
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should not be able to create mentorship session when mentor not found ', (done) => {
    chai.request(app).post('/api/v1/session')
      .send({
        mentorId: 0,
        questions: 'any thing',
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should be able to accept mentorship session request ', (done) => {
    chai.request(app).patch(`/api/v1/session/${1}/accept`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should be not able to accept mentorship session request when it is already accepted ', (done) => {
    chai.request(app).patch(`/api/v1/session/${2}/accept`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should not be able to accept mentorship session request when session not given ', (done) => {
    chai.request(app).patch(`/api/v1/session/${0}/accept`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should not be able to accept mentorship session request when he is not a mentor of that request ', (done) => {
    chai.request(app).patch(`/api/v1/session/${1}/accept`)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.an('object');
        done();
      });
  });


  it('should be able to reject mentorship session request  ', (done) => {
    chai.request(app).patch(`/api/v1/session/${1}/reject`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should be not able to reject mentorship session request when it is already rejected ', (done) => {
    chai.request(app).patch(`/api/v1/session/${3}/reject`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should not be able to reject mentorship session request when session not given ', (done) => {
    chai.request(app).patch(`/api/v1/session/${0}/reject`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should not be able to reject mentorship session request when he is not a mentor of that request ', (done) => {
    chai.request(app).patch(`/api/v1/session/${1}/reject`)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.an('object');
        done();
      });
  });
});
