import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseApp from './firebase';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './App.css';

import Home from './views/Home';
import Scores from './views/Scores';
import Calendar from './views/Calendar';

// const firebaseApp = firebase.initializeApp(firebaseConfig);

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
          <Navbar bg="info" expand="lg" variant="dark">
            <Link to={'/'} className="navbar-brand">Wine on the Rocks</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link to={'/'} className="nav-link">Home</Link>
              { user ? <Link to={'/Scores'} className="nav-link">Scores</Link> : '' }
              { user ? <Link to={'/Calendar'} className="nav-link">Calendar</Link> : '' }
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
            <PrivateRoute path="/Scores" component={Scores}/>
            <PrivateRoute path="/Calendar" component={Calendar}/>
          </div>

        </div>
      </Router>
    );

    function PrivateRoute({ component: Component, ...rest }) {
      return (
        <Route
          {...rest}
          render={props =>
            user ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      );
    }    
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
