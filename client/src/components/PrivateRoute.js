// @flow

import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { verify } from '../utils/auth';

type Props = {
  authed: Boolean,
  setAuthed: Boolean => void,

  path: String,
  component: Object,
};

const PrivateRoute = (props: Props) => {
  const { authed, setAuthed, path, component } = props;

  useEffect(() => {
    verify(localStorage.getItem('token'), () => {});
  }, [authed, setAuthed]);

  if (localStorage.getItem('token')) {
    return <Route path={path} exact component={component} />;
  }

  return <Redirect to="/login" />;
};

export default PrivateRoute;
