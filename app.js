/* eslint-disable linebreak-style */
const express = require('express');

const app = express();

app.use(express.json());

const bodyParser = require('body-parser');
const userRoute = require('./routes/user.js');
const adminRoute = require('./routes/admin.js');
const mentorRoute = require('./routes/mentor.js');
const sessionRoute = require('./routes/session.js');

app.use('/api/v1/user/', userRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/mentor', mentorRoute);
app.use('/api/v1/session', sessionRoute);
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 9000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Connected on ${port}`);
});
module.exports = app;
