import React from 'react';
import styles from './Home.module.scss';

const Home = () => (
  <div className={ styles.Home }>
    <h1 className="display-4 animated fadeInUp delay-1s">Wine on the Rocks</h1>
    <h4 className="animated fadeInUp delay-2s">The Best Worst Trivia Group Around<sup>TM</sup></h4>
  </div>
)

export default Home;