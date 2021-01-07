import React, { Component } from "react";
import Header from "./Header/Header";
import Posts from "../Posts/Posts";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import * as actionTypes from "../../store/actions/actionTypes";
import classes from "./Profile.module.css";
import Spinner from "../../UI/Spinner/Spinner";

class Profile extends Component {
  state = {};

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
  };

  // Reloading recipes when like button is clicked (to show like is incremented)
  likeHandleClick = () => {
    const getRecipies = () => this.props.getProfileRecipes(this.props.token);
    setTimeout(function () {
      getRecipies();
    }, 300);
  };

  render() {
    let posts = null;
    if (this.props.loading) {
      posts = <Spinner />
    } else {
      posts = (
        <Posts
          postType="profileRecipes"
          onClick={(e) => this.usernameHandleClick(e)}
          onLikeBtnClick={(e) => this.likeHandleClick(e)}
        />
      );
    }

    return (
      <div className={classes.Wrapper}>
        <Header profileInfo={this.props.profileInfo} />
        {posts}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    profileInfo: state.profileInfo,
    recipes: state.profileRecipes.recipes,
    loading: state.profileRecipes.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectProfilePage: () => dispatch({ type: actionTypes.PROFILE_PAGE }),
    getProfileInfo: (token) => dispatch(actions.profileInfo(token)),
    getProfileRecipes: (token) => dispatch(actions.profileRecipes(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
