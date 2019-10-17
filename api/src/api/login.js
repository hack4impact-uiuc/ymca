const fetch = require('isomorphic-unfetch');
const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');

const { AUTH_SERVER_URI } = require('../dotenvVars');
const AUTH_SERVER_LOGIN_URI = AUTH_SERVER_URI + '/login';

router.post(
  '/',
  errorWrap(async (req, res) => {
    const { email, password } = req.body;
    const authReqBody = {
      email,
      password,
    };

    const authResults = await fetch(AUTH_SERVER_LOGIN_URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authReqBody),
    });

    const authResponse = await authResults.json();
    res.json(authResponse);
  }),
);

module.exports = router;
