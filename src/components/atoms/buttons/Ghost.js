import React from 'react';
import classNames from 'classnames';
import styles from './Ghost.module.scss';

const GhostButton = ({variant, onClick, children}) => (
  <button className={classNames(styles.GhostButton, styles[variant])} onClick={onClick}>
    {children}
  </button>
);

export default GhostButton;