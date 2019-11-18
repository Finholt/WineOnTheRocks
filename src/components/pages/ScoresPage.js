import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import FilledButton from '../atoms/buttons/Filled';
import GhostButton from '../atoms/buttons/Ghost';
import styles from './ScoresPage.module.scss';

import 'firebase/firestore';
import firebaseApp from '../../firebase';

import moment from 'moment';

const db = firebaseApp.firestore();

const ScoresPage = () => {
  const [scores, setScores] = useState([0, 0, 0, 0, 0]);

  const incrementScore = (scoreRow, e) => {
    e.preventDefault();
    let tmpScores = scores;
    
    if(tmpScores[scoreRow] < 20) {
      tmpScores[scoreRow]++;
      setScores([...tmpScores]);
    }
  }

  const decrementScore = (scoreRow, e) => {
    e.preventDefault();
    let tmpScores = scores;
    
    if(tmpScores[scoreRow] > 0) {
      tmpScores[scoreRow]--;
      setScores([...tmpScores]);
    }
  }

  const changeScore = (scoreRow, newScore) => {
    let tmpScores = scores;

    tmpScores[scoreRow] = newScore !== '' ? parseInt(newScore, 10) : 0;
    setScores([...tmpScores]);
  }

  const submitScores = (e) => {
    e.preventDefault();
    
    db.collection("scores").add({
      date: parseInt(moment().format('YYYYMMDD'), 10),
      dateString: moment().format('MMMM Do YYYY'),
      scores: scores,
    }); 

    setScores([0, 0, 0, 0, 0]);
  }

  const FormContent = () => {
    let form = [];

    for (let index = 0; index < 5; index++) {
      form.push(
        <Form.Group controlId={`round-${index + 1}`} key={`round-${index + 1}`}>
          <Form.Label>Round {index + 1}</Form.Label>
          <div className={styles.formRow}>
            <GhostButton variant="secondary" onClick={e => decrementScore(index, e)}>-</GhostButton>
            <Form.Control key={`input-${index + 1}`} type="number" placeholder="Enter Score" value={scores[index]} onChange={e => changeScore(index, e.target.value)} className={styles.formRowInput} />
            <GhostButton variant="secondary" onClick={e => incrementScore(index, e)}>+</GhostButton>
          </div>
        </Form.Group>
      )
    }

    return form;
  }

  return (
    <div className={styles.scores}>
      <div className="d-flex justify-content-center">
        <div className={styles.form}>
          <Form>
            { FormContent() }

            <div>
              Total: {scores.reduce((a, b) => a + b, 0)}
            </div>

            <FilledButton variant="primary" onClick={submitScores} block>
              Submit
            </FilledButton>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ScoresPage;