import React, { Component } from "react";
import Aux from "../../UI/AuxFolder/Auxiliary";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import * as actionTypes from "../../store/actions/actionTypes";
import Posts from "../Posts/Posts";
// import classes from "./Home.module.css";
import { Redirect } from "react-router-dom";
import Spinner from "../../UI/Spinner/Spinner";

class Home extends Component {
  state = {
    redirect: null,
  };

  componentDidMount() {
    if (this.props.sp !== 1) {
      this.props.selectHomePage();
    }

    if (!this.props.token) {
      this.setState({ redirect: "/login" });
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
    this.setState({ redirect: redirectPath });
  };

  // Reloading recipes when like button is clicked (to show like is incremented)
  likeHandleClick = () => {
    const getRecipies = () => this.props.getHomeRecipes(this.props.token);
    setTimeout(function () {
      getRecipies();
    }, 300);
  };

  render() {
    let redirect = null;
    if (this.state.redirect) {
      redirect = <Redirect to={this.state.redirect} />;
    }

    let posts = null;
    if (!this.props.homeRecipes.loaded) {
      posts = <Spinner />;
    } else {
      if (this.props.homeRecipes.recipes.count > 0) {
        posts = (
          <div>
            <h3>Heres what your friends have been cooking...</h3>
            <Posts
              postType="homeRecipes"
              onClick={(e) => this.usernameHandleClick(e)}
              onLikeBtnClick={(e) => this.likeHandleClick(e)}
            />
          </div>
        );
      } else {
        posts = <div>Follow some friends to see what they are cooking!</div>;
      }
    }

    return (
      <Aux>
        {redirect}
        {this.props.username ? (
          <h3>
            Hello {this.props.username}!<br />
          </h3>
        ) : null}
        {posts}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sp: state.navbar.selectedPage,
    token: state.auth.token,
    homeRecipes: state.homeRecipes,
    username: state.profileInfo.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectHomePage: () => dispatch({ type: actionTypes.HOME_PAGE }),
    getHomeRecipes: (token) => dispatch(actions.homeRecipes(token)),
    getProfileInfo: (token) => dispatch(actions.profileInfo(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
