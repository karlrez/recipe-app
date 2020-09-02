import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Home extends Component {

  componentDidMount() {
    if (this.props.token !== null) {
      this.props.getProfileInfo(this.props.token);
      this.props.getRecipeInfo(this.props.token);
    }
  }

  render() {
    let loginMessage = null;

        if (!this.props.token) {
          loginMessage = (<a href="/login">Login</a>)
        } else {
          loginMessage = (<h2>Welcome {this.props.username}!</h2>)
        }
    return (
      <Aux>
      <p>This is home page</p>
      {loginMessage}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
      token: state.auth.token,
      recipes: state.recipeInfo.recipes,
      username: state.profileInfo.username,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      // no token required for this api call
      getRecipeInfo: (token) => dispatch(actions.recipeInfo(token, '/recipes/feed/')),
      getProfileInfo: (token) => dispatch(actions.profileInfo(token))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
