import React from 'react';
import { Line } from 'react-chartjs-2';
import styles from './GraphsPage.module.scss';

const GraphsPage = ({data, options}) => (
  <div className={styles.graphWrap}>
    <div className={styles.graph}>
      <Line
        data={data}
        width={1110}
        height={400}
        options={options}
      />
    </div>
  </div>
);

export default GraphsPage;