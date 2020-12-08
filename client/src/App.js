// @flow

import React, { useCallback } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import AdminResourceManager from './pages/AdminResourceManager';
import EditHome from './pages/EditHome';
import Home from './pages/Home';
import Footer from './components/Footer';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Navigation from './components/Navigation';
import NotFound from './pages/NotFound';
import PasswordReset from './pages/PasswordReset';
import Register from './pages/Register';
import Resources from './pages/Resources';
import ResourceUnknown from './pages/ResourceUnknown';
import RoleApproval from './pages/RoleApproval';
import ScrollToTop from './components/ScrollToTop';
import SavedResources from './pages/SavedResources';
import ResourceDetailCommon from './components/ResourceDetailCommon';
import { useAuth } from './utils/use-auth';

const App = () => {
  const { authed, authRoleIsEquivalentTo } = useAuth();

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
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute
            path="/admin"
            component={AdminResourceManager}
            exact
            minRole="admin"
          />
          <PrivateRoute
            path="/admin/:id"
            component={AdminResourceManager}
            minRole="admin"
          />
          <PrivateRoute
            path="/edit-home"
            component={EditHome}
            exact
            minRole="admin"
          />
          <Route
            path="/saved"
            render={props => <SavedResources {...props} />}
          />
          <Route path="/login" render={() => showIfUnauthed(<Login />)} />
          <Route path="/register" render={() => showIfUnauthed(<Register />)} />
          <Route
            path="/password-reset"
            render={() => showIfUnauthed(<PasswordReset />)}
          />
          <Route path="/logout" render={() => <Logout />} />
          <Route
            path="/resources"
            exact
            render={props => <Resources {...props} />}
          />
          <Route
            path="/resources/unknown"
            component={ResourceUnknown}
            status={404}
          />
          <PrivateRoute
            path="/role-approval"
            component={RoleApproval}
            minRole="admin"
          />
          <Route
            path="/resources/:id"
            render={props => <ResourceDetailCommon {...props} />}
          />
          <Route component={NotFound} status={404} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default App;
