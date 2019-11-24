import React, { useState, useEffect, useCallback } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import AdminResourceManager from './components/AdminResourceManager';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import Register from './components/Register';
import ResourceDetail from './components/ResourceDetail';
import Resources from './components/Resources';
import ResourceUnknown from './components/ResourceUnknown';
import RoleApproval from './components/RoleApproval';
import ScrollToTop from './components/ScrollToTop';
import { verify, getAllRoles } from './utils/auth';

const App = () => {
  const [authed, setAuthed] = useState(null);
  const [authRole, setAuthRole] = useState(null);
  const [authRoles, setAuthRoles] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const rolesRes = await getAllRoles();
      setAuthRoles(Object.keys(rolesRes.roles));
      verify(
        res => {
          setAuthed(true);
          setAuthRole(res.role);
        },
        () => {
          setAuthed(false);
          setAuthRole('');
        },
      );
    }
    fetchData();
  }, []);

  const authRoleIsEquivalentTo = useCallback(
    role => {
      return (
        authRoles.indexOf(authRole.toLowerCase()) <=
        authRoles.indexOf(role.toLowerCase())
      );
    },
    [authRole, authRoles],
  );

  return authed === null || authRole === null || authRoles === null ? null : (
    <>
      <Navigation
        authed={authed}
        authRoleIsEquivalentTo={authRoleIsEquivalentTo}
      />
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute
            path="/admin"
            component={AdminResourceManager}
            exact
            authed={authed}
            authRoleIsEquivalentTo={authRoleIsEquivalentTo}
            minRole="admin"
          />
          <PrivateRoute
            path="/admin/:id"
            component={AdminResourceManager}
            authed={authed}
            authRoleIsEquivalentTo={authRoleIsEquivalentTo}
            minRole="admin"
          />

          <Route
            path="/login"
            render={() =>
              !authed ? (
                <Login
                  authed={authed}
                  setAuthed={setAuthed}
                  setAuthRole={setAuthRole}
                />
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/register"
            render={() =>
              !authed ? (
                <Register
                  authed={authed}
                  setAuthed={setAuthed}
                  setAuthRole={setAuthRole}
                />
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/logout"
            render={() => (
              <Logout setAuthed={setAuthed} setAuthRole={setAuthRole} />
            )}
          />
          <Route path="/resources" exact component={Resources} />
          <Route path="/resources/unknown" component={ResourceUnknown} />
          <PrivateRoute
            path="/role-approval"
            component={RoleApproval}
            authed={authed}
            authRoleIsEquivalentTo={authRoleIsEquivalentTo}
            minRole="admin"
          />
          <Route
            path="/resources/:id"
            render={props => (
              <ResourceDetail
                {...props}
                authed={authed}
                authRoleIsEquivalentTo={authRoleIsEquivalentTo}
              />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
