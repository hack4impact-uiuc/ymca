import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AdminResourceManager from './components/AdminResourceManager';
import Home from './components/Home';
import Login from './components/Login';
import Filter from './components/Filter';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import RegisterForm from './components/RegisterForm';
import ResourceDetail from './components/ResourceDetail';

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
