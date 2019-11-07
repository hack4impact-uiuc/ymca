import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AdminResourceManager from './components/AdminResourceManager';
import Home from './components/Home';
import Login from './components/Login';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import Register from './components/Register';
import ResourceDetail from './components/ResourceDetail';
import Resources from './components/Resources';
import ResourceUnknown from './components/ResourceUnknown';

const App = () => {
  return (
    <>
      <Navigation />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/admin" exact component={AdminResourceManager} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
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
