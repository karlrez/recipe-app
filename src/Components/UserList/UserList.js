import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import classes from './UserList.module.css';

class UserList extends Component {

  render() {
      let users = null;
    if (this.props.users) {
        users = this.props.users.map(user => (
          <div key={user.username} className={classes.UserListItem}>
            <img src={user.profile_pic} alt="user-profile-pic" className={classes.UserImage}/>{user.username}
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
