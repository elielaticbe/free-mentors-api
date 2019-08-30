/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
/* eslint-disable radix */
const express = require('express');
// const app = express();
const router = express.Router();
const mentors = require('../models/mentors');

router.get('/', (req, res) => {
  res.send('Welcome to Free mentors');
});

router.get('/mentors', (req, res) => {
  const findMentors = mentors.filter((c) => c);
  const mentorCollection = new Array(findMentors);
  for (let i = 0; i < findMentors.length; i++) {
    const result = {
      mentorId: mentorCollection[0][i].mentorId,
      firstName: mentorCollection[0][i].firstName,
      lastName: mentorCollection[0][i].lastName,
      address: mentorCollection[0][i].address,
      email: mentorCollection[0][i].email,
      bio: mentorCollection[0][i].bio,
      occupation: mentorCollection[0][i].occupation,
      expertise: mentorCollection[0][i].expertise,
    };
    mentorCollection[0][i] = result;
  }
  return res.status(200).json({
    status: 200,
    data: mentorCollection,
  });
  // res.send(mentors);
});

router.get('/mentors/:userId', (req, res) => {
  const mentor = mentors.find((c) => c.userId === parseInt(req.params.userId));

  if (mentor) {
    return res.status(200).json({
      status: 200,
      data: mentor,
    });
  }
  if (!mentor) {
    return res.status(404).json({
      status: 404,
      error: 'Mentor does not exist',
    });

  }
  res.send(mentor);
});

module.exports = router;
