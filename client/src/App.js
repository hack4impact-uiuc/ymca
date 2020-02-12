import React, { useState, useEffect, useCallback } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import AdminResourceManager from './pages/AdminResourceManager';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Navigation from './components/Navigation';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import ResourceDetail from './pages/ResourceDetail';
import Resources from './pages/Resources';
import ResourceUnknown from './pages/ResourceUnknown';
import RoleApproval from './pages/RoleApproval';
import ScrollToTop from './components/ScrollToTop';
import { verify, getAllRoles } from './utils/auth';

const App = () => {
  const [authed, setAuthed] = useState(null);
  const [authRole, setAuthRole] = useState(null);
  const [authRoles, setAuthRoles] = useState(null);

  useEffect(() => {
    async function fetchData() {
      Promise.all([
        getAllRoles(),
        verify(
          res => {
            setAuthed(true);
            setAuthRole(res.role);
          },
          () => {
            setAuthed(false);
            setAuthRole('');
          },
        ),
      ]).then(vals => setAuthRoles(Object.keys(vals[0].roles)));
    }
    fetchData();
  }, [setAuthed, setAuthRole, setAuthRoles]);

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
