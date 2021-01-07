import React from 'react';

import classes from './Spinner.module.css';

const Spinner = (props) => (
    <div className={classes.spinnerWrapper}>
          <div className={classes.ldsRoller}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
);

export default Spinner;