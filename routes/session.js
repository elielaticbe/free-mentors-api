/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable linebreak-style */
const express = require('express');
// let dotenv = require('dotenv');
const session = require('../models/mentorship');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('You can create a session');
});

router.post('/', (req, res) => {
  const newSession = {
    sessionId: session.length + 1,
    mentorId: req.body.mentorId,
    menteeId: req.params.token,
    questions: req.body.questions,
    menteeEmail: req.body.menteeEmail,
    status: 'pending',
  };
  session.push(newSession);
  return res.status(201).send({
    status: 201,
    data: newSession,
  });
});

router.patch('/:sessionId/accept', (req, res) => {
  const getMentor = req.params.mentorEmail;
  let owner = session;
  const isSessionRequested = owner.find((s) => s.sessionId === parseInt(req.params.sessionId));
  owner = new Array(isSessionRequested);
  if (isSessionRequested) {
    if (getMentor !== isSessionRequested.mentorEmail) {
      return res.status(403).json({
        status: 403,
        error: 'Sorry, you are not allowed to accept this request',
      });
    }
    if (isSessionRequested.status === 'accepted') {
      return res.status(400).json({
        status: 400,
        error: 'Session Already accepted',
      });
    }
    const result = owner.map((s) => {
      s.status = 'accepted';
      return s;
    });

    return res.status(200).json({
      status: 200,
      data: result,
    });
  }
  return res.status(404).json({
    status: 404,
    error: 'Session not found',
  });
});
router.patch('/:sessionId/reject', (req, res) => {
  const getMentor = req.params.Email;
  let owner = session;
  const isSessionRequested = owner.find((s) => s.sessionId === parseInt(req.params.sessionId));
  owner = new Array(isSessionRequested);
  if (isSessionRequested) {
    if (getMentor !== isSessionRequested.mentorEmail) {
      return res.status(403).json({
        status: 403,
        error: 'Sorry, you can\'t reject this request',
      });
    }
    if (isSessionRequested.status === 'rejected') {
      return res.status(400).json({
        status: 400,
        error: 'Session Already rejected',
      });
    }
    const result = owner.map((s) => {
      s.status = 'rejected';
      return s;
    });
    return res.status(200).json({
      status: 200,
      data: result,
    });
  }
  return res.status(404).json({
    status: 404,
    error: 'Session not found',
  });
});

module.exports = router;
