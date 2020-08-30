import React from 'react';
import classes from './DrawerToggle.css';
import DrawerIcon from '../../../assets/icons/hamburger.png';

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <img src={DrawerIcon} className={classes.logo} alt="App Logo" />
    </div>
);

export default drawerToggle;
