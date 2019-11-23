import React, { useState, useEffect } from 'react';
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
import { verify } from './utils/auth';

const App = () => {
  const [authed, setAuthed] = useState(null);
  const [authRole, setAuthRole] = useState(null);

  useEffect(() => {
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
  }, []);

  return authed === null && authRole === null ? null : (
    <>
      <Navigation authed={authed} setAuthed={setAuthed} />
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute
            path="/admin"
            component={AdminResourceManager}
            exact
            authed={authed}
            minRole="admin"
          />
          <PrivateRoute
            path="/admin/:id"
            component={AdminResourceManager}
            authed={authed}
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
            minRole="admin"
          />
          <Route
            path="/resources/:id"
            render={props => <ResourceDetail {...props} authed={authed} />}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
