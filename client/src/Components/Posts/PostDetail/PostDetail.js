import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import classes from "./PostDetail.module.css";
import { NavLink } from "react-router-dom";
import LikeIcon from "../../../assets/icons/like.png";
import CommentIcon from "../../../assets/icons/comment.png";
import LikeBlueIcon from "../../../assets/icons/likeBlue.png";

class PostDetail extends Component {
  state = {};

  componentDidMount() {
    const { id } = this.props.match.params;

    if (this.props.id === id) {
      return;
    } else {
      this.props.getRecipeDetail(id);
    }

    if (this.props.token && !this.props.username) {
      this.props.getProfileInfo(this.props.token);
    }
  }

  // Refreshing page (to show like is incremented)
  likeHandleClick = async () => {
    const likePost = await this.props.likeRecipe(
      this.props.token,
      this.props.id
    );
    const reloadPost = await this.props.getRecipeDetail(this.props.id);
  };

  // Iterates thru likes array in recipe to see if post was already liked by user
  checkLikedPost = () => {
    for (let i = 0; i < this.props.likes.length; i++) {
      if (this.props.username === this.props.likes[i]) {
        return true;
      }
    }
  };

  // Return either blue or black like button based on if post was already liked
  createLikeButton = () => {
    let likeButton;

    if (!this.checkLikedPost()) {
      likeButton = (
        <img
          src={LikeIcon}
          alt="LikeIcon"
          value={this.props.id}
          onClick={(e) => this.likeHandleClick()}
          className={classes.LikeIcon}
        ></img>
      );
    } else {
      likeButton = (
        <img
          src={LikeBlueIcon}
          alt="Blue Like Icon"
          value={this.props.id}
          onClick={(e) => this.likeHandleClick()}
          className={classes.LikeIcon}
        ></img>
      );
    }

    return likeButton;
  };

  commentHandleClick = (event, recipeId) => {
    event.preventDefault();
    alert("Comment feature coming soon!");
  };

  render() {
    // once the recipe is loaded we get the profile pic
    if (this.props.user && this.props.id !== this.props.otherProfileId) {
      this.props.otherProfileInfo(this.props.user);
    }

    // generating list items for ingredients and tags
    let ingredients;
    let tags = "";
    let name;

    if (this.props.user) {
      ingredients = this.props.ingredients.map((ingredient) => (
        <li key="{ingredient.id}">{ingredient}</li>
      ));

      tags = this.props.tags.map((tag) => tags.toString().concat(`#${tag} `));

      // Also making recipe name uppercase
      name = this.props.name[0]
        .toUpperCase()
        .concat(this.props.name.substr(1, this.props.name.length));
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.recipeWrapper}>
          <div className={classes.profilePicDiv}>
            <NavLink
              to={`/user/${this.props.user}`}
              className={classes.userNameLink}
            >
              <img
                src={this.props.profile_pic}
                alt="profile-pic"
                className={classes.profilePic}
              ></img>
              <span className={classes.usernameDiv}>{this.props.user}</span>
            </NavLink>
          </div>

          <img
            src={this.props.image}
            alt="recipe"
            className={classes.recipeImage}
          ></img>
          <div>
            <div className={classes.iconDiv}>
              <button value={this.props.id} className={classes.LikeButton}>
                {this.createLikeButton()}
                &nbsp;{this.props.likes.length}
              </button>
              <button className={classes.LikeButton}>
                <img
                  src={CommentIcon}
                  className={classes.LikeIcon}
                  alt="comment icon"
                  value={this.props.id}
                  onClick={(e) => this.commentHandleClick(e, this.props.id)}
                />
                &nbsp;0
              </button>
            </div>
          </div>
        </div>
        <div className={classes.recipeNameDiv}>
          <span className={classes.recipeName}>{`${name}\n`}</span>
          <div className={classes.tags}>{tags}</div>
          {this.props.date ? (
            <span
              className={classes.dateText}
            >{`Posted ${this.props.date.substr(0, 10)}`}</span>
          ) : null}
        </div>
        <h3>Ingredients</h3>
        <div className={classes.textboxes}>
          <ul>{ingredients}</ul>
        </div>
        <h3>Instructions</h3>
        <div className={classes.textboxes}>{this.props.instructions}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.recipeDetail.id,
    user: state.recipeDetail.user,
    name: state.recipeDetail.name,
    ingredients: state.recipeDetail.ingredients,
    tags: state.recipeDetail.tags,
    time_hours: state.recipeDetail.time_hours,
    price: state.recipeDetail.price,
    instructions: state.recipeDetail.instructions,
    image: state.recipeDetail.image,
    date: state.recipeDetail.date,
    likes: state.recipeDetail.likes,
    error: state.recipeDetail.error,
    loading: state.recipeDetail.loading,
    loaded: state.recipeDetail.loaded,
    profile_pic: state.otherProfileInfo.profile_pic,
    otherProfileId: state.otherProfileInfo.id,
    token: state.auth.token,

    username: state.profileInfo.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipeDetail: (id) => dispatch(actions.recipeDetail(id)),
    otherProfileInfo: (user) => dispatch(actions.otherProfileInfo(user)),
    likeRecipe: (token, recipeId) =>
      dispatch(actions.likeRecipe(token, recipeId)),
    getProfileInfo: (token) => dispatch(actions.profileInfo(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
