import fetch from 'isomorphic-fetch';

const globalvars = require('./globalvars');

const { SERVER_URI } = globalvars;

const register = body => {
  return fetch(`${SERVER_URI}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(res => res.json());
};

export default register;
