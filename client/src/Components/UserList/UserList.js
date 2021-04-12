import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import classes from './UserList.module.css';
import { NavLink } from 'react-router-dom';

class UserList extends Component {

  render() {
    let users = null;
    if (this.props.users) {
        users = this.props.users.map(user => (
          <div key={user.username} className={classes.UserListItem}>
            <NavLink 
              to={"/user/" + user.username}
              onClick={this.props.closed}>
              <img src={user.profile_pic} alt="profile-pic" className={classes.UserImage}/>&nbsp;{user.username}<br />
          </NavLink>
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
      users: state.searchUsers.users.results,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
