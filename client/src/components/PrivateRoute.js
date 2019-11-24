// @flow

import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { verify, getAllRoles } from '../utils/auth';

type Props = {
  minRole: String,
  path: String,
  component: Object,
  authed: Boolean,
  authRoleIsEquivalentTo: String => void,
};

const PrivateRoute = (props: Props) => {
  const { minRole, path, component, authed, authRoleIsEquivalentTo } = props;

  if (authed && authRoleIsEquivalentTo(minRole)) {
    return <Route path={path} exact component={component} />;
  }

  return <Redirect to="/login" />;
};

export default PrivateRoute;
