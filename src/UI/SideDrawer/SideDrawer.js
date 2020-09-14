import React, { Component } from 'react';
import classes from './SideDrawer.module.css';
import Backdrop from './Backdrop/Backdrop';
import Aux from '../../UI/AuxFolder/Auxiliary';
import Logo from '../../assets/icons/recipe.png';
import Edit from '../../assets/icons/edit.png';
import Logout from '../../assets/icons/logout.png';
import Login from '../../assets/icons/login.png';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class SideDrawer extends Component {
  state = {

  }

  render() {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (this.props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    let editLink;
    let loginLink;
    if (this.props.isAuthenticated) {
      loginLink = (
        <NavLink 
          to="/logout"
          exact="/logout">
          <img src={Logout} alt="Logout Icon" />
            Logout
        </NavLink>
      );
      editLink = (
        <NavLink 
            to="/modify-user"
            exact="modify-user">
            <img src={Edit} alt="Edit Icon" />
            Edit Profile
          </NavLink>
      );
    } else {
      loginLink = (
        <NavLink 
          to="/login"
          exact="/login">
          <img src={Login} alt="Login Icon" />
            Login
        </NavLink>
      );
      editLink = (
        <NavLink 
            to="/create-user"
            exact="/create-user">
            <img src={Edit} alt="Edit Icon" />
            Create Profile
          </NavLink>
      )
    }
    
    return (
      <Aux>
        <Backdrop show={this.props.open} clicked={this.props.closed}/>
        <div className={attachedClasses.join(' ')}>
          <div className={classes.LogoText}>
            <img src={Logo} className={classes.Logo} alt="App Logo" />
            RecipeGram
          </div>
        <div className={classes.OptionsList}>
          { editLink}
          { loginLink }
        </div>
        </div>
      </Aux>
    )
  } 
};

const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(SideDrawer);
