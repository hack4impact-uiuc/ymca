// @flow

import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../utils/use-auth';

type Props = {
  minRole: string,
  path: string,
  component: React.ComponentType<any>,
};

const PrivateRoute = (props: Props) => {
  const { authed, authRoleIsEquivalentTo } = useAuth();
  const { minRole, path, component } = props;

  const equivalent = authRoleIsEquivalentTo(minRole);

  if (authed === true && equivalent === true) {
    return <Route path={path} exact component={component} />;
  }

  if (authed === null || equivalent === null) {
    return null;
  }

  return <Redirect to="/login" />;
};

export default PrivateRoute;
