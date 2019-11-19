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

export const getUsersForRolesPage = () => {
  return fetch(`${AUTH_SERVER_URI}/roles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('token'),
      google: !!localStorage.getItem('google'),
    },
  });
};

export const changeRole = (userEmail, newRole, password) => {
  return fetch(`${AUTH_SERVER_URI}/roleschange`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('token'),
    },
    body: JSON.stringify({
      userEmail,
      newRole,
      password,
    }),
  });
};

export const verify = (token, onErr) => {
  return fetch(`${AUTH_SERVER_URI}/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
  })
    .then(res => res.json())
    .then(res => {
      if (res.status === 200) {
        localStorage.setItem('token', token);
      } else {
        onErr(res);
      }
    });
};
