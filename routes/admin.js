/* eslint-disable linebreak-style */
/* eslint-disable radix */
const express = require('express');
// const app = express();
const users = require('../models/users');
const mentors = require('../models/mentors');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to Free mentors');
});
// create admin account
router.get('/auth/signup', (req, res) => {
  res.send([1, 2, 3]);
});

router.patch('/user/:userId', (req, res) => {
  const findUser = users.find((m) => m.userId === parseInt(req.params.userId));
  if (!findUser) {
    return res.status(404).json({
      status: 404,
      error: 'User Not Found',
    });
  }

  if (findUser.isAdmin === true) {
    return res.status(403).json({
      status: 403,
      error: 'Admin not allowed to be a mentor!',
    });
  }
  const newMentor = {
    mentorId: mentors.length + 1,
    email: findUser.email,
    firstName: findUser.firstName,
    lastName: findUser.lastName,
    address: findUser.address,
    bio: findUser.bio,
    occupation: findUser.occupation,
    expertise: findUser.expertise,
  };
  mentors.push(newMentor);
  users.splice(users.indexOf(findUser));
  return res.status(200).json({
    status: 200,
    data: {
      message: 'User Account changed to mentor successfully',
    },
  });
});

module.exports = router;
