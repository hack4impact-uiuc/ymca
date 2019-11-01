import { Route, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Home from './Home';
import Navigation from './Navigation';
import ResourceDetail from './ResourceDetail';
import RegisterForm from './RegisterForm';
import Login from './Login';
import Filter from './Filter';
import AdminResourceManager from './AdminResourceManager';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Navigation />
        <Router>
          <Route path="/register" exact component={RegisterForm} />
          <Route path="/" exact component={Home} />
          <Route path="/resource/:id" component={ResourceDetail} />
          <Route path="/login" exact component={Login} />
          <Route path="/filter" exact component={Filter} />
          <Route path="/admin" exact component={AdminResourceManager} />
        </Router>
      </>
    );
  }
}
