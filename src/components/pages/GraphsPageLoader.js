import React from 'react';
import GraphsPage from './GraphsPage';
import useGraphsPageHooks from './GraphsPageHooks';

const fromatData = (scoreData) => ({
  labels: scoreData.dates,
  datasets: [{
    label: 'Total Score',
    data: scoreData.scores,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1
  }],
});

const options = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      ticks: {
        suggestedMin: 0,
        suggestedMax: 60
      }
    }]
  },
  legend: {
    display: false,
  },
}

const GraphsPageLoader = () => {
  const [scoreData, loading] = useGraphsPageHooks();

  return (
    <>
      {
        loading ? "Loading..." : <GraphsPage data={fromatData(scoreData)} options={options} />
      }
    </>
  );
};

export default GraphsPageLoader;