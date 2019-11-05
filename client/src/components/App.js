import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AdminResourceManager from './AdminResourceManager';
import Home from './Home';
import Login from './Login';
import Filter from './Filter';
import Navigation from './Navigation';
import NotFound from './NotFound';
import RegisterForm from './RegisterForm';
import ResourceDetail from './ResourceDetail';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Navigation />
        <Router>
          <Switch>
            <Route path="/register" exact component={RegisterForm} />
            <Route path="/" exact component={Home} />
            <Route path="/resources/:id" component={ResourceDetail} />
            <Route path="/login" exact component={Login} />
            <Route path="/resources" exact component={Filter} />
            <Route path="/admin" exact component={AdminResourceManager} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </>
    );
  }
}
