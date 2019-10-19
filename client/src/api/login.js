import fetch from 'isomorphic-fetch';

const globalvars = require('./globalvars');

const { AUTH_SERVER_URI } = globalvars;

const login = body => {
  // auth
  return fetch(`${AUTH_SERVER_URI}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(res => res.json());
};

export default login;
