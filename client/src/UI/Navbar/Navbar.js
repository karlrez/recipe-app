import React, { Component } from 'react';
import classes from './Navbar.module.css';
import Aux from '../AuxFolder/Auxiliary';
import Home from '../../assets/icons/home.png';
import Add from '../../assets/icons/add.png';
import Profile from '../../assets/icons/profile.png';
import Search from '../../assets/icons/search.png';
import Trophy from '../../assets/icons/trophy.png';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actionTypes from '../../store/actions/actionTypes';

class Navbar extends Component {
  state = {
      selectedPage: 1
  }


  render() {
    return (
      <Aux>
        <div className={classes.navbar}>
          <NavLink
            to="/"
            className={this.props.sp === 1 ? classes.active : null}
            onClick={this.props.selectHomePage}>
            <img src={Home} alt="Home Icon" />
            <span className={classes.icontext}>Home</span>
          </NavLink>

          <NavLink
            to="/search"
            className={this.props.sp === 2 ? classes.active : null}
            onClick={this.props.selectSearchPage}>
            <img src={Search} alt="Search Icon" />
            <span className={classes.icontext}>Search</span>
          </NavLink>

          <NavLink
            to="/add"
            className={this.props.sp === 3 ? classes.active : null}
            onClick={this.props.selectAddPage}>
            <img src={Add} alt="Add Icon" />
            <span className={classes.icontext}>Add</span>
          </NavLink>

          <NavLink
            to="/popular"
            className={this.props.sp === 4 ? classes.active : null}
            onClick={this.props.selectPopularPage}>
            <img src={Trophy} alt="Trophy Icon" />
            <span className={classes.icontext}>Popular</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={this.props.sp === 5 ? classes.active : null}
            onClick={this.props.selectProfilePage}>
            <img src={Profile} alt="Profile Icon" />
            <span className={classes.icontext}>Profile</span>
          </NavLink>
        </div>
      </Aux>
    )
  }
}

// Gets value from global state, so we can use in this component
const mapStateToProps = state => {
  return {
    sp: state.navbar.selectedPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectSearchPage: () => dispatch({type: actionTypes.SEARCH_PAGE}),
    selectHomePage: () => dispatch({type: actionTypes.HOME_PAGE}),
    selectAddPage: () => dispatch({type: actionTypes.ADD_PAGE}),
    selectPopularPage: () => dispatch({type: actionTypes.POPULAR_PAGE}),
    selectProfilePage: () => dispatch({type: actionTypes.PROFILE_PAGE})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
