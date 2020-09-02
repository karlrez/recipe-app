import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Posts extends Component {

  componentDidMount() {
    this.props.getRecipeInfo(this.props.token);
  }

  render() {
    return (
      <Aux>
      <div>Posts go here</div>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
      token: state.auth.token,
      recipes: state.recipeInfo.recipes
  };
};

const mapDispatchToProps = dispatch => {
    return {
        getRecipeInfo: (token) => dispatch(actions.recipeInfo(token, '/recipes/my-recipes/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
