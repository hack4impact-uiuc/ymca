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
import { verify } from './utils/auth';

const App = () => {
  const [authed, setAuthed] = useState(false);

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
      <Navigation authed={authed} setAuthed={setAuthed} />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute
            path="/admin"
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
          <Route path="/resources/:id" component={ResourceDetail} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
