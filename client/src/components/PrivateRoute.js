// @flow

import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {
  minRole: string,
  path: string,
  component: React.ComponentType<any>,
  authed: ?boolean,
  authRoleIsEquivalentTo: string => ?boolean,
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
