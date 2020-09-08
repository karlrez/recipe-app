import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Posts from '../Posts/Posts';

class Popular extends Component {

  componentDidMount() {
    //this.props.getRecipeInfo();
  }

  render() {
    return (
      <Aux>
      <h2>This is the Popular page</h2>
      <Posts />
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
      //recipes: state.recipeInfo.recipes
  };
};

const mapDispatchToProps = dispatch => {
    return {
        // no token required for this api call
        //getRecipeInfo: () => dispatch(actions.recipeInfo(null, '/recipes/popular/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popular);
