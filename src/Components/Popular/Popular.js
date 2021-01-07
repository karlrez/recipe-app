import React, { Component } from "react";
import Aux from "../../UI/AuxFolder/Auxiliary";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import * as actionTypes from "../../store/actions/actionTypes";
import Posts from "../Posts/Posts";
import Spinner from "../../UI/Spinner/Spinner";

class Popular extends Component {
  componentDidMount() {
    this.props.getPopularRecipes();

    if (this.props.sp !== 4) {
      this.props.selectPopularPage();
    }
  }

  // Reloading recipes when like button is clicked to show like is incremented
  likeHandleClick = () => {
    const getRecipies = () => this.props.getPopularRecipes();
    setTimeout(function () {
      getRecipies();
    }, 300);
  };

  render() {
    let posts = null;
    if (!this.props.recipes) {
      posts = <Spinner />;
    } else {
      posts = (
        <Posts
          postType="popularRecipes"
          onClick={(e) => this.usernameHandleClick(e)}
          onLikeBtnClick={(e) => this.likeHandleClick(e)}
        />
      );
    }
    return (
      <Aux>
        <h2>Our most liked posts!</h2>
        {posts}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.popularRecipes.recipes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectPopularPage: () => dispatch({ type: actionTypes.POPULAR_PAGE }),
    getPopularRecipes: () => dispatch(actions.popularRecipes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popular);
