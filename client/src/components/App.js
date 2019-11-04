import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React from 'react';
import Home from './Home';
import Navigation from './Navigation';
import ResourceDetail from './ResourceDetail';
import RegisterForm from './RegisterForm';
import Login from './Login';
import Filter from './Filter';
import NotFound from './NotFound';
import AdminResourceManager from './AdminResourceManager';

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
