import React from 'react';
import '../css/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import AppNavbar from './AppNavbar';
import ResourceDetailed from './ResourceDetailed';
import Login from './Login';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/navbar" exact component={AppNavbar} />
          <Route path="/resource" exact component={ResourceDetailed} />
          <Route path="/login" exact component={Login} />
        </div>
      </Router>
    );
  }
}
