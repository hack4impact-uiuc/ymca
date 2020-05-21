// @flow

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {
  minRole: String,
  path: String,
  component: Object,
  authed: Boolean,
  authRoleIsEquivalentTo: String => void,
};

const PrivateRoute = (props: Props) => {
  const { minRole, path, component, authed, authRoleIsEquivalentTo } = props;

  const equivalent = authRoleIsEquivalentTo(minRole);

  if (authed && equivalent) {
    return <Route path={path} exact component={component} />;
  }

  if (authed === null || equivalent === null) {
    return null;
  }

  return <Redirect to="/login" />;
};

export default PrivateRoute;
