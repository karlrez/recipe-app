import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Like from '../../assets/icons/like.png';
import classes from './Posts.module.css';
import axios from '../../axios';


class Posts extends Component {
  state = {
    recipes: null,
  }

  componentDidMount() {
    if (this.props.recipes) {
      this.setState({recipes: this.props.recipes});
    }
  }

  // FIGURE OUT WAY TO INCREMENT LIKES 
  likeHandleClick = (event) => {
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
  }

  render() {
    let posts = null;
    if (this.state.recipes) {
      posts = this.state.recipes.map(post => (
        <div key={post.id} className={classes.Posts}>
          <img src={post.image} alt="recipe" className={classes.Images}/>
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
    otherProfileRecipes: state.otherProfileRecipes.recipes,
    homeRecipesLoaded: state.homeRecipes.loaded,
    popularRecipesLoaded: state.popularRecipes.loaded,
    searchRecipesLoaded: state.searchRecipes.loaded,
  };
};

const mapDispatchToProps = dispatch => {
    return {
        getHomeRecipes: (token) => dispatch(actions.homeRecipes(token, '/recipes/feed/')),
        getPopularRecipes: () => dispatch(actions.popularRecipes('/recipes/popular/')),
        getSearchRecipes: () => dispatch(actions.searchRecipes('/recipes/all-recipes/')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
