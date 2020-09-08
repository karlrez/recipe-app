import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import classes from './Profile.module.css';
import Header from './Header/Header';
import Posts from '../Posts/Posts';
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    let loginMessage = null;
    if (!this.props.token) {
      loginMessage = (<a href="/login">Login</a>)
    }
    return (
      <Aux>
        {loginMessage}
        <Header />
        <Posts />
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
      token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Profile);
