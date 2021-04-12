import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import LikeIcon from "../../assets/icons/like.png";
import LikeBlueIcon from "../../assets/icons/likeBlue.png";
import CommentIcon from "../../assets/icons/comment.png";
import classes from "./Posts.module.css";
import { NavLink } from "react-router-dom";

class Posts extends Component {

  componentDidMount() {
    if (this.props.token && !this.props.username) {
      this.props.getProfileInfo(this.props.token);
    }
  }

  likeHandleClick = (event, recipeId) => {
    event.preventDefault();

    // Sometimes recipeId is undefined
    if (!recipeId) {
      return;
    }
    console.log(`recipe id: ${recipeId}`);

    this.props.likeRecipe(this.props.token, recipeId);
    // outer component will make api call to get updated recipes
    this.props.onLikeBtnClick();
  };

  commentHandleClick = (event, recipeId) => {
    event.preventDefault();
    alert("Comment feature coming soon!");
  };

  // Iterates thru likes array in recipe to see if post was already liked by user
  checkLikedPost = (post) => {
    for (let i = 0; i < post.likes.length; i++) {
      if (this.props.username === post.likes[i]) {
        return true;
      }
    }
  };

  // Return either blue or black like button based on if post was already liked
  createLikeButton = (post) => {
    let likeButton;

    if (!this.checkLikedPost(post)) {
      likeButton = (
        <img
          src={LikeIcon}
          alt="LikeIcon"
          value={post.id}
          onClick={(e) => this.likeHandleClick(e, post.id)}
          className={classes.LikeIcon}
        ></img>
      );
    } else {
      likeButton = (
        <img
          src={LikeBlueIcon}
          alt="Blue Like Icon"
          value={post.id}
          onClick={(e) => this.likeHandleClick(e, post.id)}
          className={classes.LikeIcon}
        ></img>
      );
    }

    return likeButton;
  };

  render() {
    let recipes;
    switch (this.props.postType) {
      case "homeRecipes":
        recipes = this.props.homeRecipes;
        break;
      case "searchRecipes":
        recipes = this.props.searchRecipes;
        break;
      case "popularRecipes":
        recipes = this.props.popularRecipes;
        break;
      case "profileRecipes":
        recipes = this.props.profileRecipes;
        break;
      case "otherProfileRecipes":
        recipes = this.props.otherProfileRecipes;
        break;
      default:
        break;
    }

    let posts;
    //console.log("recipe length: " + recipes.length);
    //console.log(JSON.stringify(recipes));
    if (recipes && recipes.length !== 0) {
      posts = recipes.results.map((post) => (
        <div key={post.id} className={classes.Posts}>
          <NavLink to={`/user/${post.user}`} className={classes.userLink}>
            {post.user}
          </NavLink>
          <NavLink to={`post-detail/${post.id}`}>
            <img src={post.image} alt="recipe" className={classes.Images} />
          </NavLink>
          <div className={classes.nameAndIconDiv}>
            <div className={classes.recipeNameDiv}>
              <NavLink
                to={`post-detail/${post.id}`}
                className={classes.recipeNameText}
              >
                {post.name[0].toUpperCase() +
                  post.name.substr(1, post.name.length)}
              </NavLink>
              <span className={classes.Date}>
                <br />
                -Posted {post.date.substr(0, 10)}
              </span>
            </div>
            <div className={classes.iconDiv}>
              <button value={post.id} className={classes.LikeButton}>
                {this.createLikeButton(post)}
                &nbsp;{post.likes.length}
              </button>
              <button className={classes.LikeButton}>
                <img
                  src={CommentIcon}
                  className={classes.LikeIcon}
                  alt="comment icon"
                  value={post.id}
                  onClick={(e) => this.commentHandleClick(e, post.id)}
                />
                &nbsp;0
              </button>
            </div>
          </div>
        </div>
      ));
    }

    return <div>{posts}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    selectedPage: state.navbar.selectedPage,
    homeRecipes: state.homeRecipes.recipes,
    searchRecipes: state.searchRecipes.recipes,
    popularRecipes: state.popularRecipes.recipes,
    profileRecipes: state.profileRecipes.recipes,
    otherProfileRecipes: state.otherProfileRecipes.recipes,

    error: state.likeRecipe.error,
    loading: state.likeRecipe.loading,

    username: state.profileInfo.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    likeRecipe: (token, recipeId) =>
      dispatch(actions.likeRecipe(token, recipeId)),
      getProfileInfo: (token) => dispatch(actions.profileInfo(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
