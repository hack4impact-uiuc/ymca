// @flow

import React from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../utils/use-auth';

const Logout = () => {
  const { logout } = useAuth();
  logout();
  return <Redirect to="/" />;
};

export default Logout;
