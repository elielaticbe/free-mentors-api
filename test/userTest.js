/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

describe('Authentication tests', () => {
  it('User should be able to signup when data are valid ', (done) => {
    chai.request(app).post('/api/v1/user/auth/signup').send({
      firstName: 'Elijah',
      lastName: 'Laticbe',
      email: 'elielaticbe@yahoo.com',
      password: 'elie',
      address: 'Namugongo',
      bio: 'A family of 20',
      occupation: 'system admin',
      expertise: 'web developer',
    }).end((err, res) => {
      res.should.have.status(201);
      res.body.should.be.an('object');
      done();
    });
  });

  it('User should not be able to signup when user already exist', (done) => {
    chai.request(app).post('/api/v1/user/auth/signup').send({
      firstName: 'Elijah',
      lastName: 'Laticbe',
      email: 'elielaticbe@yahoo.com',
      password: 'elie',
      address: 'Namugongo',
      bio: 'A family of 20',
      occupation: 'system admin',
      expertise: 'web developer',
    }).end((err, res) => {
      res.should.have.status(409);
      res.body.should.be.an('object');
      done();
    });
  });

  it('User should not be able to signup when user already exist from mentor', (done) => {
    chai.request(app).post('/api/v1/user/auth/signup').send({
      firstName: 'Elijah',
      lastName: 'Laticbe',
      email: 'elielaticbe@yahoo.com',
      password: 'elie',
      address: 'Namugongo',
      bio: 'A family of 20',
      occupation: 'system admin',
      expertise: 'web developer',
    }).end((err, res) => {
      res.should.have.status(409);
      res.body.should.be.an('object');
      done();
    });
  });

  it('User should be able to login when valid data', (done) => {
    chai.request(app).post('/api/v1/user/auth/signin').send({
      email: 'elijahlaticbe@yahoo.com',
      password: 'elie',
    }).end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it('User should not be able to login when email does not exist', (done) => {
    chai.request(app).post('/api/v1/user/auth/signin').send({
      email: 'baby@gmail.com',
      password: 'elie',
    }).end((err, res) => {
      res.should.have.status(401);
      res.body.should.be.an('object');
      done();
    });
  });

  it('User should not be able to login when password is blank', (done) => {
    chai.request(app).post('/api/v1/user/auth/signin').send({
      email: 'elijahlaticbe@yahoo.com',
      password: '',
    }).end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });
});
