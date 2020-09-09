import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class UserList extends Component {

  render() {
      let users = null;
    if (this.props.users) {
        users = this.props.users.map(user => (
          <div key={user.username}>
            <img src={user.profile_pic} alt="user-profile-pic"/>{user.username}
          </div>
      ))
      }

    return (
      <Aux>
          {users}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
      users: state.searchUsers.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
