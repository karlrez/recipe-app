import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Like from '../../assets/icons/like.png';
import classes from './Posts.module.css';

class Posts extends Component {


  componentDidMount() {
    if (this.props.token !== null && this.props.profileRecipesLoaded === false) {
      this.props.getProfileRecipes(this.props.token);
    }
    if (this.props.token !== null && this.props.homeRecipesLoaded === false) {
      this.props.getHomeRecipes(this.props.token);
    }
    if (this.props.popularRecipesLoaded === false) {
      this.props.getPopularRecipes();
    }
    if (this.props.searchRecipesLoaded === false) {
      this.props.getSearchRecipes();
    }
  }

  render() {
    let recipes = null;
    switch (this.props.selectedPage) {
      case 1: {
        recipes = this.props.homeRecipes;
        break;
      }
      case 2: {
        recipes = this.props.searchRecipes;
        break;
      }
      case 3: {
        break;
      }
      case 4: {
        recipes = this.props.popularRecipes;
        break;
      }
      case 5: {
        recipes = this.props.profileRecipes;
        break;
      }
      default: {
        break;
      }
    }

    let posts = null;
    if (recipes) {
      posts = recipes.map(post => (
        <div key={post.id} className={classes.Posts}>
          <img src={post.image} alt="recipe-image" className={classes.Images}/>
      <p>{post.name} by {post.user}<button className={classes.LikeButton}><img src={Like} className={classes.LikeIcon}/>{post.likes.length}</button></p>
      
        </div>
    ))
    }
      

    return (
      <Aux>
        {posts}
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
      homeRecipesLoaded: state.homeRecipes.loaded,
      profileRecipesLoaded: state.profileRecipes.loaded,
      popularRecipesLoaded: state.popularRecipes.loaded,
      searchRecipesLoaded: state.searchRecipes.loaded,
  };
};

const mapDispatchToProps = dispatch => {
    return {
        getProfileRecipes: (token) => dispatch(actions.profileRecipes(token, '/recipes/my-recipes/')),
        getHomeRecipes: (token) => dispatch(actions.homeRecipes(token, '/recipes/feed/')),
        getPopularRecipes: () => dispatch(actions.popularRecipes('/recipes/popular/')),
        getSearchRecipes: () => dispatch(actions.searchRecipes('/recipes/all-recipes/')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
