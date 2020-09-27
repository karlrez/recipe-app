import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import Header from './Header/Header';
import Posts from '../Posts/Posts';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import * as actionTypes from '../../store/actions/actionTypes';
import { Redirect } from 'react-router-dom';


class Profile extends Component {
  state = {
    
  }

  componentDidMount() {
    if (this.props.sp !== 5) {
      this.props.selectProfilePage();
    }
    if (this.props.token) {
      this.props.getProfileInfo(this.props.token); 
    }
    if (this.props.token) {
      this.props.getProfileRecipes(this.props.token); 
    }
  }

  // No need to redirect to your own profile
  usernameHandleClick = (e) => {
    e.preventDefault();
  } 

  render() {
    let redirect = null;
    if (!this.props.token) {
        redirect = <Redirect to='/login' />
    }

    let posts = null;
    if (this.props.loading) {
      posts = (<div>Loading...</div>)
    } else {
      posts = (
        <Posts
          recipes={this.props.recipes}
          onClick={(e) => this.usernameHandleClick(e)} />
      )
    }

    return (
      <Aux>
        {redirect}
        <Header profileInfo={this.props.profileInfo}/>
        {posts}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    profileInfo: state.profileInfo,
    recipes: state.profileRecipes.recipes,
    loading: state.profileRecipes.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectProfilePage: () => dispatch({type: actionTypes.PROFILE_PAGE}),
    getProfileInfo: (token) => dispatch (actions.profileInfo(token)),
    getProfileRecipes: (token) => dispatch (actions.profileRecipes(token)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
