import React from 'react';
import classes from './SideDrawer.module.css';
import Backdrop from './Backdrop/Backdrop';
import Aux from '../../UI/AuxFolder/Auxiliary';
import Logo from '../../assets/icons/recipe.png';
import Edit from '../../assets/icons/edit.png';
import Logout from '../../assets/icons/logout.png';

const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.LogoText}>
                  <img src={Logo} className={classes.Logo} alt="App Logo" />
                  RecipeGram
                </div>
                  <div className={classes.OptionsList}>
                    <a href="#">
                      <img src={Edit} alt="Edit Icon" />
                      <span className={classes.IconText}>Edit Profile</span>
                    </a>
                    <a href="#">
                      <img src={Logout} alt="Logout Icon" />
                      <span className={classes.IconText}>Logout</span>
                    </a>
                  </div>
            </div>
        </Aux>
    );
};

export default sideDrawer;
