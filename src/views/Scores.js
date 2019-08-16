import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import FilledButton from '../components/buttons/Filled';
import GhostButton from '../components/buttons/Ghost';

import 'firebase/firestore';
import firebaseApp from '../firebase';

import moment from 'moment';

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
    e.preventDefault();
    let scores = this.state.scores
    
    if(scores[scoreRow] < 20) {
      scores[scoreRow]++
      this.refreshState(scores)
    }
  }

  subtractScore = (scoreRow, e) => {
    e.preventDefault();
    let scores = this.state.scores

    if(scores[scoreRow] > 0) {
      scores[scoreRow]--
      this.refreshState(scores)
    }
  }

  changeScore = (scoreRow, e) => {
    let scores = this.state.scores

    scores[scoreRow] = e.target.value !== '' ? parseInt(e.target.value, 10) : ''
    this.refreshState(scores)
  }

  createForm = () => {
    let form = [];

    for (let index = 0; index < 5; index++) {
      let cid = "round-" + (index + 1);
      form.push(
        <Form.Group controlId={cid}>
          <Form.Label>Round {index + 1}</Form.Label>
          <div className="Scores__form-row">
            <GhostButton variant="secondary" onClick={(e) => this.subtractScore(index, e)}>-</GhostButton>
            <Form.Control type="number" placeholder="Enter Score" value={this.state.scores[index]} onChange={(e) => this.changeScore(index, e)} className="scoreForm" />
            <GhostButton variant="secondary" onClick={(e) => this.addScore(index, e)}>+</GhostButton>
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

  handleSubmit = (e) => {
    e.preventDefault();
    
    db.collection("scores").add({
      date: parseInt(moment().format('YYYYMMDD'), 10),
      dateString: moment().format('MMMM Do YYYY'),
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

              <FilledButton variant="primary" onClick={(e) => this.handleSubmit(e)} block>
                Submit
              </FilledButton>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Scores;