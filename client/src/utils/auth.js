import fetch from 'isomorphic-fetch';

const AUTH_SERVER_URI = 'https://ymca-auth.now.sh';

export const login = body => {
  // auth
  return fetch(`${AUTH_SERVER_URI}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(res => res.json());
};

export const register = body => {
  const { email, password } = body;

  return fetch(`${AUTH_SERVER_URI}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      role: 'admin',
      questionIdx: 0,
      answer: '_',
    }),
  }).then(res => res.json());
};

export const verify = token => {
  return fetch(`${AUTH_SERVER_URI}/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
  }).then(res => res.json());
};
