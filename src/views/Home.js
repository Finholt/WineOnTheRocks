import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card'

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="row">
          <div className="col-12">
            <Jumbotron>
              <h1 className="display-4">Heya! Welcome! Hello!</h1>
              <p className="lead">This is the website for the best worst trivia group out there: <strong>Wine on the Rocks</strong></p>
            </Jumbotron>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-4 mb-3">
          <Card bg="info" text="white">
            <Card.Header>First Place Victories</Card.Header>
            <Card.Body>
              <Card.Text>
                <div className="display-4">0</div>
              </Card.Text>
            </Card.Body>
          </Card>
          </div>

          <div className="col-12 col-lg-4 mb-3">
          <Card border="info">
            <Card.Header>Gift Card Funds Available</Card.Header>
            <Card.Body>
              <Card.Text>
                <div className="display-4">$72</div>
              </Card.Text>
            </Card.Body>
          </Card>
          </div>

          <div className="col-12 col-lg-4 mb-3">
          <Card bg="info" text="white">
            <Card.Header>Fucks Given</Card.Header>
            <Card.Body>
              <Card.Text>
                <div className="display-4">0</div>
              </Card.Text>
            </Card.Body>
          </Card>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Home;