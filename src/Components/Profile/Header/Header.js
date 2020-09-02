import React, { Component } from 'react';
import Aux from '../../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';


class Header extends Component {
  state = {

  }

  componentDidMount() {
    //this.props.getProfileInfo(this.props.token);
  }

  render() {
    return (
      <Aux>
      Header goes here
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
      token: state.auth.token,
      username: state.profileInfo.username,
      full_name: state.profileInfo.full_name,
      title: state.profileInfo.title,
      bio: state.profileInfo.bio,
      followers: state.profileInfo.followers,
      following: state.profileInfo.following,
      date_joined: state.profileInfo.date_joined,
      profile_pic: state.profileInfo.profile_pic,
      error: state.profileInfo.error,
      loading: state.profileInfo.error
  };
};

const mapDispatchToProps = dispatch => {
    return {
        getProfileInfo: (token) => dispatch(actions.profileInfo(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
