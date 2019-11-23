// @flow

import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { verify } from '../utils/auth';

type Props = {
  minRole: String,
  path: String,
  component: Object,
  authed: Boolean,
};

const PrivateRoute = (props: Props) => {
  const { minRole, path, component, authed } = props;

  return authed ? (
    <Route path={path} exact component={component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
