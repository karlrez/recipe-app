import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Like from '../../assets/icons/like.png';
import classes from './Posts.module.css';
import axios from '../../axios';
import Modal from '../../UI/Modal/Modal';
import { NavLink } from 'react-router-dom';


class Posts extends Component {
  state = {
    showModal: false,
    modalRecipe: null,
  }

  componentDidMount() {

  }

  // FIGURE OUT WAY TO INCREMENT LIKES 
  likeHandleClick = (event) => {
    event.preventDefault();
    if (!this.props.token) {
      alert('Sign in to like recipes!');
      return;
    }

    const header = {
      headers: {
          Authorization: 'Token ' + this.props.token }
  }
    axios.get('recipes/like/' + event.target.value, header)
            .then(response => {
                console.log(response.data.like);
            })
            .catch(err => {
                console.log(err.response);
            });
    
    // Changing style of button after click
    if (event.target.classList.contains(classes.LikeButtonClicked)) {
      event.target.classList.remove(classes.LikeButtonClicked);
    } else {
      event.target.classList.add(classes.LikeButtonClicked);
  }
}

  showModalHandler = (post) => {
    let currentState = this.state.showModal;
    this.setState(
      {showModal: !currentState,
      modalRecipe: post});
  }

  hideModalHandler = () => {
    this.setState({showModal: false});
  }

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
    if (recipes) {
      posts = recipes.results.map(post => (
        <div key={post.id} className={classes.Posts}>
          <NavLink 
            to="#"
            onClick={() => this.showModalHandler(post)}>
            <img src={post.image} alt="recipe" className={classes.Images} />
          </NavLink>
      <p>{post.name} by&nbsp;
        <button onClick={this.props.onClick} value={post.user} className={classes.UserBtn}>{post.user}</button>
        <button onClick={this.likeHandleClick} value={post.id} className={classes.LikeButton}>
            <img src={Like} className={classes.LikeIcon} alt="like button"/>
              &nbsp;{post.likes.length}
        </button>
      </p>
      <p className={classes.Date}>Posted {post.date.substr(0,10)}</p>
        </div>
    ))
    }

    let modal = null;
    if (this.state.showModal) {
      modal = (
        <Modal
          show="true"
          closed={this.hideModalHandler}
          recipe={this.state.modalRecipe}
          showFollowers = "" />);
    }
    return (
      <Aux>
        {posts}
        {modal}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    selectedPage: state.navbar.selectedPage,
    homeRecipes: state.homeRecipes.recipes,
    searchRecipes: state.searchRecipes.recipes,
    popularRecipes: state.popularRecipes.recipes,
    profileRecipes: state.profileRecipes.recipes,
    otherProfileRecipes: state.otherProfileRecipes.recipes,
  };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
