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

export const verify = (onSucc, onErr) => {
  const token = localStorage.getItem('token');
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
        if (res.token) {
          localStorage.setItem('token', res.token);
        }

        if (onSucc) {
          onSucc(res);
        }
      } else if (onErr) {
        onErr(res);
      }
    });
};

export const getAllRoles = () => {
  return fetch(`${AUTH_SERVER_URI}/roles/all`, {
    method: 'GET',
  }).then(res => res.json());
};
