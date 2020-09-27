import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import Header from './Header/Header'
import Posts from '../Posts/Posts';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


class OtherProfile extends Component {
  componentDidMount() {
    const { username } = this.props.match.params

    if (username) {
      this.props.getOtherProfileInfo(username);
      this.props.getOtherProfileRecipes(username);
    }
  }

  render() {
    return (
      <Aux>
        <Header profileInfo={this.props.profileInfo}/>
        <Posts recipes={this.props.recipes}/>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    profileInfo: state.otherProfileInfo,
    profileInfoError: state.otherProfileInfo.error,
    recipeError: state.otherProfileInfo.error,
    recipes: state.otherProfileRecipes.recipes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOtherProfileInfo: (username) => dispatch(actions.otherProfileInfo(username)),
    getOtherProfileRecipes: (username) => dispatch(actions.otherProfileRecipes(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);
