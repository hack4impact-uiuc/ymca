// @flow

import React, { useCallback, Suspense, lazy } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import { useAuth } from './utils/use-auth';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Logout = lazy(() => import('./pages/Logout'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PasswordReset = lazy(() => import('./pages/PasswordReset'));
const Register = lazy(() => import('./pages/Register'));
const Resources = lazy(() => import('./pages/Resources'));
const ResourceUnknown = lazy(() => import('./pages/ResourceUnknown'));
const SavedResources = lazy(() => import('./pages/SavedResources'));
const ResourceDetailCommon = lazy(() =>
  import('./components/ResourceDetailCommon'),
);

const AdminResourceManager = lazy(() => import('./pages/AdminResourceManager'));

const App = (): React$Element<React$FragmentType> => {
  const { authed, authRoleIsEquivalentTo } = useAuth();

  const showIfUnauthed = useCallback(
    (component) => {
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
        <Suspense fallback={<div>Loading...</div>}>
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

            <Route
              path="/saved"
              render={(props) => <SavedResources {...props} />}
            />

            <Route path="/login" render={() => showIfUnauthed(<Login />)} />

            <Route
              path="/register"
              render={() => showIfUnauthed(<Register />)}
            />

            <Route
              path="/password-reset"
              render={() => showIfUnauthed(<PasswordReset />)}
            />

            <Route path="/logout" render={() => <Logout />} />
            <Route
              path="/resources"
              exact
              render={(props) => <Resources {...props} />}
            />
            <Route path="/resources/unknown" component={ResourceUnknown} />
            <Route
              path="/resources/:id"
              render={(props) => <ResourceDetailCommon {...props} />}
            />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
        <Footer />
      </Router>
    </>
  );
};

export default App;
