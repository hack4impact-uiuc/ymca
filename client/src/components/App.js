import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './Home';
import Navigation from './Navigation';
import ResourceDetail from './ResourceDetail';
import Login from './Login';
import Filter from './Filter';
import NotFound from './NotFound';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Navigation />
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/resource" exact component={ResourceDetail} />
            <Route path="/login" exact component={Login} />
            <Route path="/filter" exact component={Filter} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </>
    );
  }
}
