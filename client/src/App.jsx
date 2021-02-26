// @flow

import React, { useCallback, Suspense, lazy, useState, useEffect } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import { useAuth } from './utils/use-auth';
import { getTranslationByLanguage } from './utils/api';

const EditHome = lazy(() => import('./pages/EditHome'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Logout = lazy(() => import('./pages/Logout'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PasswordReset = lazy(() => import('./pages/PasswordReset'));
const Register = lazy(() => import('./pages/Register'));
const Resources = lazy(() => import('./pages/Resources'));
const ResourceUnknown = lazy(() => import('./pages/ResourceUnknown'));
const RoleApproval = lazy(() => import('./pages/RoleApproval'));
const SavedResources = lazy(() => import('./pages/SavedResources'));
const ResourceDetailCommon = lazy(() =>
  import('./components/ResourceDetailCommon'),
);

const AdminResourceManager = lazy(() => import('./pages/AdminResourceManager'));

const App = (): React$Element<React$FragmentType> => {
  const { authed, authRoleIsEquivalentTo } = useAuth();
  const [language, setLanguage] = useState('English');
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const fetchTranslations = async () => {
      const res = await getTranslationByLanguage(language);
      let newMessages = {};
      if (res && res.result) {
        newMessages = res.result.messages;
      }
      // if (res) {
      //   res.result.forEach((id) => {
      //     newMessages[id] = res.result[id];
      //   });
      // }
      setMessages(newMessages);
    };
    fetchTranslations();
  }, [language, setMessages]);

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

  // query messages from backend based on locale/language
  // may have to keep english translations for consistency with defaultMessage
  // const messagesEnglish = {
  //   homeWelcome: 'Welcome to Urbana-Champaign',
  // };

  // const messagesSpanish = {
  //   homeWelcome: 'Bienvenidos a Urbana-Champaign',
  // };

  return (
    <IntlProvider
      messages={messages}
      // locale={locale}
    >
      <Router>
        <ScrollToTop />
        <Navigation setLanguage={setLanguage} />
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
            <PrivateRoute
              path="/edit-home"
              component={EditHome}
              exact
              minRole="admin"
            />
            <PrivateRoute
              path="/role-approval"
              component={RoleApproval}
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
    </IntlProvider>
  );
};

export default App;
