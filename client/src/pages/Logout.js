// @flow

import React from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../utils/use-auth';

const Logout = () => {
  const { setAuthed, setAuthRole } = useAuth();

  localStorage.removeItem('token');
  setAuthed(false);
  setAuthRole('');

  return <Redirect to="/" />;
};

export default Logout;
