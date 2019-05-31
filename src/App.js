import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './App.css';

import Background from './views/Background'
import Home from './views/Home';
import Calendar from './views/Calendar';

const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

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
            <Nav>
              {
                user ? <Button variant="light" onClick={signOut}>Sign Out</Button> : <Button variant="light" onClick={signInWithGoogle}>Sign In</Button>
              }
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

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
