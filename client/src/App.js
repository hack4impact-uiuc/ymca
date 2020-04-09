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
import PasswordReset from './pages/PasswordReset';
import Register from './pages/Register';
import ResourceDetail from './pages/ResourceDetail';
import Resources from './pages/Resources';
import ResourceUnknown from './pages/ResourceUnknown';
import RoleApproval from './pages/RoleApproval';
import ScrollToTop from './components/ScrollToTop';
import { verify, getAllRoles } from './utils/auth';
import SavedResources from './pages/SavedResources';
import ResourceDetailMobile from './components/mobile/ResourceDetailMobile';

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
      ]).then(vals => setAuthRoles(Object.keys(vals[0].roles).concat('')));
    }
    fetchData();
  }, [setAuthed, setAuthRole, setAuthRoles]);

  const authRoleIsEquivalentTo = useCallback(
    role => {
      return authRole === null || authRoles === null
        ? null
        : authRoles.indexOf(authRole.toLowerCase()) <=
            authRoles.indexOf(role.toLowerCase());
    },
    [authRole, authRoles],
  );

  const showIfUnauthed = useCallback(
    component => {
      if (authed != null) {
        if (!authed) {
          return component;
        }

        if (authRoleIsEquivalentTo('admin')) {
          return <Redirect to="/admin" />;
        }

        return <Redirect to="/" />;
      }

      return null;
    },
    [authRoleIsEquivalentTo, authed],
  );

  return (
    <>
      <Router>
        <ScrollToTop />
        <Navigation
          authed={authed}
          authRoleIsEquivalentTo={authRoleIsEquivalentTo}
        />
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
            path="/saved"
            render={props => <SavedResources {...props} authed={authed} />}
          />

          <Route
            path="/login"
            render={() =>
              showIfUnauthed(
                <Login
                  authed={authed}
                  setAuthed={setAuthed}
                  setAuthRole={setAuthRole}
                />,
              )
            }
          />

          <Route
            path="/register"
            render={() =>
              showIfUnauthed(
                <Register
                  authed={authed}
                  setAuthed={setAuthed}
                  setAuthRole={setAuthRole}
                />,
              )
            }
          />

          <Route
            path="/password-reset"
            render={() =>
              showIfUnauthed(
                <PasswordReset
                  authed={authed}
                  setAuthed={setAuthed}
                  setAuthRole={setAuthRole}
                />,
              )
            }
          />

          <Route
            path="/logout"
            render={() => (
              <Logout setAuthed={setAuthed} setAuthRole={setAuthRole} />
            )}
          />
          <Route
            path="/resources"
            exact
            render={props => <Resources {...props} authed={authed} />}
          />
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
              // <ResourceDetail
              //   {...props}
              //   authed={authed}
              //   authRoleIsEquivalentTo={authRoleIsEquivalentTo}
              // />
              <ResourceDetailMobile
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
