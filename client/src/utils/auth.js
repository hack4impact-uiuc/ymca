/* eslint-disable no-console */

import fetch from 'isomorphic-fetch';

const AUTH_SERVER_URI = 'https://nawc.now.sh/auth';

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
  const { email, password, questionIdx, answer } = body;

  return fetch(`${AUTH_SERVER_URI}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      role: 'public',
      questionIdx,
      answer,
    }),
  }).then(res => res.json());
};

export const getUsersForRolesPage = () => {
  return fetch(`${AUTH_SERVER_URI}/roles/selfset`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('token'),
      google: !!localStorage.getItem('google'),
    },
  });
};

export const getSecurityQuestions = () => {
  return fetch(`${AUTH_SERVER_URI}/getSecurityQuestions`, {
    method: 'GET',
  }).then(res => res.json());
};

export const resetPassword = body => {
  const { email, password, answer } = body;
  return fetch(`${AUTH_SERVER_URI}/passwordReset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      answer,
    }),
  }).then(res => res.json());
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

export const getSavedResources = () => {
  return fetch(`${AUTH_SERVER_URI}/resources`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('token'),
    },
  }).then(res => res.json());
};

export const saveResource = resID => {
  return fetch(`${AUTH_SERVER_URI}/resource`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('token'),
    },
    body: JSON.stringify({
      resourceId: resID,
    }),
  })
    .then(res => res.json())
    .catch(err => {
      console.err(err);
      return null;
    });
};

export const deleteSavedResource = resID => {
  return fetch(`${AUTH_SERVER_URI}/resource`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('token'),
    },
    body: JSON.stringify({
      resourceId: resID,
    }),
  })
    .then(res => res.json())
    .catch(err => {
      console.err(err);
      return null;
    });
};
