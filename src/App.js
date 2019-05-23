import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';

import Background from './views/Background'
import Home from './views/Home';
import Calendar from './views/Calendar';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Background></Background>

          <Navbar bg="info" expand="lg" variant="dark">
            <Link to={'/'} className="navbar-brand">Wine on the Rocks</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link to={'/'} className="nav-link">Home</Link>
              <Link to={'/Calendar'} className="nav-link">Calendar</Link>
            </Nav>
            </Navbar.Collapse>
          </Navbar>

          <div className="Main container">
            <Route exact={true} path="/" component={Home}/>
            <Route path="/Calendar" component={Calendar}/>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
