import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

import 'firebase/firestore';
import firebaseApp from '../firebase';

const db = firebaseApp.firestore();
let scoreData = {dates: [], scores: []};
db.collection("scores").orderBy("date", "asc").get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    scoreData.dates.push(doc.data().dateString);
    scoreData.scores.push(doc.data().scores.reduce((a, b) => a + b, 0));
  })
});

let data = {
  labels: scoreData.dates,
  datasets: [{
    label: 'Total Score',
    data: scoreData.scores,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1
  }]
}

let options = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      ticks: {
        suggestedMin: 0,
        suggestedMax: 60
      }
    }]
  }
}

class Charts extends Component {
  render() {
    return (
      <div className="Charts">
        <Line
          data={data}
          width={400}
          height={400}
          options={options}
        />
      </div>
    );
  }
}

export default Charts;