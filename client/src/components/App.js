import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Navigation from './Navigation';
import ResourceDetail from './ResourceDetail';
import Login from './Login';
import Filter from './Filter';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Navigation />
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/resource" exact component={ResourceDetail} />
          <Route path="/login" exact component={Login} />
          <Route path="/filter" exact component={Filter} />
        </Router>
      </>
    );
  }
}
