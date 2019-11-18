import React from 'react';
import classNames from 'classnames';
import styles from './Filled.module.scss';

const FilledButton = ({variant, onClick, children}) => (
  <button className={classNames(styles.FilledButton, styles[variant])} onClick={onClick}>
    {children}
  </button>
)

export default FilledButton;