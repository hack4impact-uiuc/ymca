import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

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
import NavigationMobile from './components_mobile/Navigation';
import { detectMobile } from './utils/mobile';

const App = () => {
  const [authed, setAuthed] = useState(false);

  const [isMobile, setIsMobile] = useState(detectMobile());

  // componentDidMount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthed(true);
    }

    // validate token
    verify(token, () => {});
  }, []);

  return (
    <>
      {isMobile && <NavigationMobile />}
      {/* <Navigation authed={authed} setAuthed={setAuthed} /> */}
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute
            path="/admin"
            component={AdminResourceManager}
            exact
            authed={authed}
            setAuthed={setAuthed}
          />
          <PrivateRoute
            path="/admin/:id"
            component={AdminResourceManager}
            authed={authed}
            setAuthed={setAuthed}
          />
          <Route
            path="/login"
            render={() => <Login authed={authed} setAuthed={setAuthed} />}
          />
          <Route
            path="/logout"
            render={() => <Logout authed={authed} setAuthed={setAuthed} />}
          />
          <Route
            path="/register"
            render={() => <Register authed={authed} setAuthed={setAuthed} />}
          />
          <Route path="/resources" exact component={Resources} />
          <Route path="/resources/unknown" component={ResourceUnknown} />
          <PrivateRoute
            path="/role-approval"
            component={RoleApproval}
            authed={authed}
            setAuthed={setAuthed}
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
