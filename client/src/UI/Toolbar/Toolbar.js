import React from 'react';
import classes from './Toolbar.module.css';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../assets/icons/recipe.png';

const toolbar = ( props ) => (
    <header className={classes.toolbar}>
          <p className={classes.headertext}>
            <img src={Logo} className={classes.logo} alt="App Logo" />
            RecipeGram
          </p>
        <DrawerToggle clicked={props.drawerToggleClicked} />
    </header>
);

export default toolbar;
