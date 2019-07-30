import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import 'firebase/firestore';
import firebaseApp from '../firebase';

const db = firebaseApp.firestore();

class Scores extends Component {
  constructor() {
    super();
    this.state = {
      scores: [0, 0, 0, 0, 0]
    }

    this.addScore = this.addScore.bind(this);
  }

  refreshState = (newScores) => {
    this.setState(state => ({
      scores: newScores
    }));
  }
  
  addScore = (scoreRow, e) => {
    if(this.state.scores[scoreRow] < 20) {
      this.state.scores[scoreRow]++
      this.refreshState()
    }
  }

  subtractScore = (scoreRow, e) => {
    if(this.state.scores[scoreRow] > 0) {
      this.state.scores[scoreRow]--
      this.refreshState()
    }
  }

  changeScore = (scoreRow, e) => {
    this.state.scores[scoreRow] = e.target.value !== '' ? parseInt(e.target.value) : ''
    this.refreshState()
  }

  createForm = () => {
    let form = [];

    for (let index = 0; index < 5; index++) {
      let cid = "round-" + (index + 1);
      form.push(
        <Form.Group controlId={cid}>
          <Form.Label>Round {index + 1}</Form.Label>
          <div className="Scores__form-row">
            <Button variant="info" onClick={(e) => this.subtractScore(index, e)}>-</Button>
            <Form.Control type="number" placeholder="Enter Score" value={this.state.scores[index]} onChange={(e) => this.changeScore(index, e)} />
            <Button variant="info" onClick={(e) => this.addScore(index, e)}>+</Button>
          </div>
        </Form.Group>
      )
    }

    return form;
  }

  totalScores = () => {
    let total = 0
    for (let index = 0; index < this.state.scores.length; index++) {
      if(Number.isInteger(this.state.scores[index])) {
        total += this.state.scores[index]
      }
    }
    return total;
  }

  handleSubmit = () => {
    db.collection("scores").add({
      date: Date.now(),
      scores: this.state.scores
    }); 

    this.setState(state => ({
      scores: [0, 0, 0, 0, 0]
    }));
  }
  
  render() {
    return (
      <div className="Scores">
        <div className="d-flex justify-content-center">
          <div className="Scores__form">
            <Form>
              {this.createForm()}

              <div>
                Total: {this.totalScores()}
              </div>

              <Button variant="info" onClick={this.handleSubmit} block>
                Submit
              </Button>
            </Form>
          </div>
        </div>
        
        
      </div>
    );
  }
}

export default Scores;