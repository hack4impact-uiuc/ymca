const https = require('https');
const mongoose = require('mongoose');
const fetch = require('isomorphic-unfetch');
const User = require('../models/ymcaEmployee');

const { AUTH_SERVER_URI } = require('../dotenvVars');
const AUTH_SERVER_VERIFY_URI = AUTH_SERVER_URI + '/verify';

const auth = async (req, res, next) => {
  const { token } = req.headers;
  const authReq = await fetch(AUTH_SERVER_VERIFY_URI, {
    method: 'POST',
    headers: {
      token,
    },
  });

  const authRes = await authReq.json();
  if (authRes.status === 200) {
    const { role, uid, newToken } = authReq;

    if (newToken !== undefined) {
      res.set({ token: newToken });
    } else {
      res.set({ token });
    }

    const user = await User.findById(uid);
    // put user model in _user
    req._user = user;

    console.log(user);

    next();
  }

  // if not auth'd (from https://github.com/hack4impact-uiuc/h4i-recruitment/blob/eab33c223314abb367558dc6e5cfa05d90989681/frontend/src/utils/api.js)
  res.status(403).json({
    code: 403,
    message: 'Unauthorized',
    success: false,
  });
};

module.exports = auth;
