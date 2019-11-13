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
  console.log(localStorage.getItem('token'));
  try {
    return fetch(`${AUTH_SERVER_URI}/roles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // token: getCookie("token"),
        token: localStorage.getItem('token'),
        // google: getCookie("google") ? true : false
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const changeRole = (userEmail, newRole, password) => {
  try {
    return fetch(`${AUTH_SERVER_URI}/roleschange`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // token: getCookie("token"),
        token: localStorage.getItem('token'),
        // google: getCookie("google") ? true : false
      },
      body: JSON.stringify({
        userEmail,
        newRole,
        password,
      }),
    });
  } catch (err) {
    console.log(err);
  }
};

export const verify = () => {
  try {
    return fetch(`${AUTH_SERVER_URI}/verify/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
    });
  } catch (err) {
    console.log(err);
  }
};
