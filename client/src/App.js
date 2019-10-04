import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import AppNavbar from "./AppNavbar"

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/navbar" exact component={AppNavbar} />
        </div>
      </Router>
    );
  }
}
