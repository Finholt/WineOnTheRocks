import React from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseApp from './firebase';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import FilledButton from './components/atoms/buttons/Filled';
import styles from './App.module.scss';

import Home from './components/pages/Home';
import GraphsPageLoader from './components/pages/GraphsPageLoader';
import ScoresPage from './components/pages/ScoresPage';

function App({user, signOut, signInWithGoogle}) {
  return (
    <Router>
      <div className={ styles.App }>
        <Navbar bg="none" expand="lg" variant="dark">
          <Link to={'/'} className="navbar-brand">Wine on the Rocks</Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to={'/'} className="nav-link">Home</Link>
            <Link to={'/graphs'} className="nav-link">View Graphs</Link>
            { user ? <Link to={'/scores'} className="nav-link">Submit Scores</Link> : '' }
          </Nav>
          <Nav>
            {
              user ? <FilledButton variant='primary' onClick={signOut}>Sign Out</FilledButton> : <FilledButton variant='primary' onClick={signInWithGoogle}>Sign In</FilledButton>
            }
          </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="container">
          <Route exact={true} path="/" component={Home} user={user}/>
          <Route path="/graphs" component={GraphsPageLoader} user={user}/>
          <PrivateRoute path="/scores" component={ScoresPage} user={user}/>
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

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
