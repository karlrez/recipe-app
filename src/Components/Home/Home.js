import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    let loginMessage = null;

        if (this.props.isAuthenticated) {
            loginMessage = (<p>You are signed in!</p>);
        } else {
          loginMessage = (<a href="/login">Login</a>)
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
      isAuthenticated: state.auth.token !== null,
  };
};


export default connect(mapStateToProps)(Home);
