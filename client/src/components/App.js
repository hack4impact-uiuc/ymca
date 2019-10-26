import React from 'react';
import '../css/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import AppNavbar from './AppNavbar';
import ResourceDetail from './ResourceDetail';
import Login from './Login';
import Filter from './Filter';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/navbar" exact component={AppNavbar} />
          <Route path="/resource/:id" component={ResourceDetail} />
          <Route path="/login" exact component={Login} />
          <Route path="/filter" exact component={Filter} />
        </div>
      </Router>
    );
  }
}
