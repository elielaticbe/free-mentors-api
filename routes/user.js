/* eslint-disable linebreak-style */
const express = require('express');
const jwt = require('jsonwebtoken');
// let bcrypt = require ('bcrypt');
const dotenv = require('dotenv');
const usersModel = require('../models/users');

dotenv.config();
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to Free mentors');
});

const users = [{
  userId: 1,
  firstName: 'Moses',
  lastName: 'Israel',
  email: 'moisrael@gmail.com',
  password: 'mosey',
  address: 'namugongo',
  bio: 'First born in a family of 9',
  occupation: 'student',
  expertise: 'Non',
  isAdmin: false,
}];

const mentors = [{
  userId: 1,
  firstName: 'Sage',
  lastName: 'Pascal',
  email: 'sagepascal3@gmail.com',
  password: 'Letmein2020',
  address: 'Najjanankumbi',
  bio: 'Fifth born in a family of 7',
  occupation: 'Business man',
  expertise: 'Teacher',
  isAdmin: false,
}];

router.get('/auth/users', (req, res) => {
  res.send(users);
});

// eslint-disable-next-line consistent-return
router.post('/auth/signup', (req, res) => {
  const isUserExist = users.find((user) => user.email === req.body.email);
  // const isMentor = mentors.find(u => u.email === req.body.email);

  // if (isUserExist || isMentor)
  if (isUserExist) {
    return res.status(409).json({
      status: 409,
      error: 'user already exist in the system',
    });
  }

  // const password = bcrypt.hashSync(req.body.password, 10);
  const newUser = {
    userId: users.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    bio: req.body.bio,
    occupation: req.body.occupation,
    expertise: req.body.expertise,
    isAdmin: false,
  };

  users.push(newUser);
  // res.send(newUser);
  // token
  const token = jwt.sign({
    userId: newUser.userId,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    bio: newUser.bio,
    occupation: newUser.occupation,
    expertise: newUser.expertise,
    isAdmin: false,
    // process.env.secretKey
  }, 'elie', { expiresIn: '30d' });
  res.status(201).json({
    status: 201,
    message: 'User created succefully',
    data: {
      token,
      message: 'User created succefully',
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      address: newUser.address,
      bio: newUser.bio,
      occupation: newUser.occupation,
      expertise: newUser.expertise,
      isAdmin: false,

    },
  });
});
// user signin
// eslint-disable-next-line consistent-return
router.post('/auth/signin', (req, res) => {
  const isUserExist = usersModel.find((user) => user.email === req.body.email);
  const isMentor = mentors.find((u) => u.email === req.body.email);
  if (!isUserExist && !isMentor) {
    return res.status(401).json({
      status: 401,
      message: 'Email not exists',
    });
  }
  if (isUserExist) {
    // const password = bcryt.ocompareSync(req.body.password, isUserExist.password);
    const { password } = isUserExist;
    if (!password) {
      return res.status(401).json({
        status: 401,
        message: 'Password not exists',
      });
    }
    const token = jwt.sign({
      userId: isUserExist.userId,
      email: isUserExist.email,
      isAdmin: isUserExist.isAdmin,
    }, 'elie', { expiresIn: '28d' });
    res.status(200).json({
      status: 200,
      message: 'User is successfully logged in',
      data: { token },
    });
  } else {
    // const password = bcrypt.compareSync(req.body.password, isMentor.password);
    const { password } = isUserExist;
    if (!password) {
      return res.status(401).json({
        status: 401,
        message: 'Password not exists',
      });
    }
    const token = jwt.sign({
      userId: isMentor.userId,
      email: isMentor.email,
      isAdmin: isMentor.isAdmin,
    }, 'elie', { expiresIn: '28d' });
    res.status(200).json({
      status: 200,
      message: 'User is succefully logged in',
      data: { token },
    });
  }
});

module.exports = router;
