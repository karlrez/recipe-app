import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import Posts from '../Posts/Posts';

class Home extends Component {

  componentDidMount() {

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
      {loginMessage}
      <Posts />
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
      token: state.auth.token,
      recipes: state.profileRecipes.recipes,
      username: state.profileInfo.username,
  };
};

export default connect(mapStateToProps)(Home);
