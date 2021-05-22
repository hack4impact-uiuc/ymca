// @flow

import React, { useCallback, Suspense, lazy, useState, useEffect } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import Loader from 'react-loader-spinner';
import { ConfigProvider } from 'antd';
import frFR from 'antd/lib/locale/fr_FR';
import zhCN from 'antd/lib/locale/zh_CN';
import esES from 'antd/lib/locale/es_ES';
import enUS from 'antd/lib/locale/en_US';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import { useAuth } from './utils/use-auth';
import { getTranslationByLanguage } from './utils/api';

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
const Translations = lazy(() => import('./pages/Translations'));
const EditTranslations = lazy(() => import('./pages/EditTranslations'));

const FORMAT_JS_LOCALE_DICT = {
  English: 'en',
  Spanish: 'es',
  French: 'fr',
  Chinese: 'zh',
};
const ANTD_LOCALE_DICT = {
  English: enUS,
  Spanish: esES,
  French: frFR,
  Chinese: zhCN,
};

const App = (): React$Element<React$FragmentType> => {
  const { authed, authRoleIsEquivalentTo } = useAuth();
  const [language, setLanguage] = useState(
    localStorage.getItem('language') || 'English',
  );
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const fetchTranslations = async () => {
      if (language === 'English') {
        setMessages({});
      } else {
        const res = await getTranslationByLanguage(language);
        let newMessages = {};
        if (res && res.result) {
          newMessages = res.result.messages;
        }
        setMessages(newMessages);
      }
    };
    fetchTranslations();
  }, [language, setMessages]);

  const storeLanguage = (selectedLanguage) => {
    localStorage.setItem('language', selectedLanguage);
    setLanguage(selectedLanguage);
  };

  const showIfUnauthed = useCallback(
    (component) => {
      if (authed) {
        if (!authed) {
          return component;
        }

        if (authRoleIsEquivalentTo('admin')) {
          return <Redirect to="/admin" />;
        }
        if (authRoleIsEquivalentTo('nawc volunteer')) {
          return <Redirect to="/translations" />;
        }

        return <Redirect to="/" />;
      }

      return null;
    },
    [authRoleIsEquivalentTo, authed],
  );

  return (
    <ConfigProvider locale={ANTD_LOCALE_DICT[language]}>
      <IntlProvider
        messages={messages}
        locale={FORMAT_JS_LOCALE_DICT[language]}
      >
        <Router>
          <ScrollToTop />
          <Navigation language={language} setLanguage={storeLanguage} />
          <Suspense
            fallback={
              <Loader
                className="app-loader"
                type="Circles"
                color="#6A3E9E"
                height={100}
                width={100}
                style={{
                  textAlign: 'center',
                }}
              />
            }
          >
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
                path="/translations"
                component={Translations}
                exact
                minRole="nawc volunteer"
              />
              <PrivateRoute
                path="/translations/:id"
                component={EditTranslations}
                minRole="nawc volunteer"
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
    </ConfigProvider>
  );
};

export default App;
