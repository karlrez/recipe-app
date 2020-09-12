import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import Posts from '../Posts/Posts';
import classes from './Home.module.css';
import { NavLink } from 'react-router-dom';
import LockIcon from '../../assets/icons/lock.png';

class Home extends Component {
  state = {
    login: true,
  }

  render() {
    let loginMessage = null;
    if (!this.props.token && this.state.login === true) {
      loginMessage = (
      <div className={classes.loginMessageDiv}>
        <div>
          <NavLink 
            to="/login"
            exact="/login">
              Sign In&nbsp;
          </NavLink>
        to view your feed
        </div>
        <div className={classes.childDiv}>
          Dont have an account?&nbsp;
          <NavLink 
            to="/create-user"
            exact="/create-user">
              Create an Account
          </NavLink>
        </div>
        <div>
          <img src={LockIcon} alt="Lock-Icon" className={classes.lockIcon} />
        </div>
      </div>);
    } 

    return (
      <Aux className={classes.wrapper}>
      {loginMessage}
      <Posts />
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
      token: state.auth.token,
      recipes: state.profileRecipes.recipes,
      username: state.profileInfo.username,
  };
};

export default connect(mapStateToProps)(Home);
