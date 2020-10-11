import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import * as actionTypes from '../../store/actions/actionTypes';
import Posts from '../Posts/Posts';
import classes from './Home.module.css';
import { Redirect } from 'react-router-dom';

class Home extends Component {
  state = {
    redirect: null,
  }

  componentDidMount() {
    if (this.props.sp !== 1) {
      this.props.selectHomePage();
    }
    
    if (!this.props.token) {
      this.setState({redirect: '/login'});
    }

    if (this.props.token) {
      this.props.getHomeRecipes(this.props.token);
      this.props.getProfileInfo(this.props.token);
    }
  }

  // Called when a username is clicked
  usernameHandleClick = (e) => {
    e.preventDefault();
    let redirectPath = "/user/" + e.target.value;
    this.setState({redirect: redirectPath});
  }

  // Called when like button is clicked
  usernameHandleClick = (e) => {
    e.preventDefault();
    let redirectPath = "/user/" + e.target.value;
    this.setState({redirect: redirectPath});
  } 

  render() {
    let redirect = null;
      if (this.state.redirect) {
          redirect = <Redirect to={this.state.redirect} />
      }

    let posts = null;
    if (this.props.homeRecipes.loading) {
      posts = (
        <div>Loading...</div>
      )
    } else {
      posts = (
        <Posts
          postType="homeRecipes"
          onClick={(e) => this.usernameHandleClick(e)} />
      )
    }

    let emptyFeedMessage;
    if (this.props.homeRecipes.loaded) {
      if (this.props.homeRecipes.recipes.length < 1) {
        posts = (
        <div className={classes.EmptyFeedMessage}>Follow some users to see their recipes here!</div>
        );
      } 
    }

    return (
      <Aux className={classes.wrapper}>
        {redirect}
        {this.props.username ? <h3>Hello {this.props.username}!<br /><br /> Heres what your friends have been cooking...</h3> : null}
        {posts}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    sp: state.navbar.selectedPage,
    token: state.auth.token,
    homeRecipes: state.homeRecipes,
    username: state.profileInfo.username,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectHomePage: () => dispatch({type: actionTypes.HOME_PAGE}),
    getHomeRecipes: (token) => dispatch(actions.homeRecipes(token)),
    getProfileInfo: (token) => dispatch(actions.profileInfo(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
