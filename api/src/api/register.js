const fetch = require('isomorphic-unfetch');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');

const YMCAEmployee = require('../models/ymcaEmployee');

const { AUTH_SERVER_URI } = require('../dotenvVars');
const AUTH_SERVER_REGISTER_URI = AUTH_SERVER_URI + '/register';

router.post(
  '/',
  errorWrap(async (req, res) => {
    const { email, password, companyId } = req.body;
    const role = 'public';

    const authReq = await fetch(AUTH_SERVER_REGISTER_URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        role,
        questionIdx: 0,
        answer: '_',
      }),
    });

    const authRes = await authReq.json();

    if (authRes.status === 200) {
      // create new YMCAEmployee in database
      const newYMCAEmployee = new YMCAEmployee({ email, role, companyId });
      newYMCAEmployee.save();
    }

    res.json(authRes);
  }),
);

module.exports = router;
