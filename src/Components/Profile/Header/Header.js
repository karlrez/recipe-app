import React, { Component } from 'react';
import Aux from '../../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import classes from './Header.module.css';
import axios from '../../../axios';

class Header extends Component {

  // FIGURE OUT WAY TO SHOW FOLLOWED
  followHandleClick = (event) => {
    const header = {
      headers: {
          Authorization: 'Token ' + this.props.token }
  }
  console.log(this.props.token);
  const url = 'user/' + event.target.value + '/follow';
    axios.get(url, header)
            .then(response => {
                console.log(response.data.follow);
            })
            .catch(err => {
                console.log(err.response);
            });
  }

  render() {
    let info = null;
    if (this.props.profileInfo) {
       info = (
       <div className={classes.Header}>
         <img src={this.props.profileInfo.profile_pic} className={classes.ProfilePic} alt="profile-pic"/>
         <p className={classes.FullName}>{this.props.profileInfo.full_name}</p>
         <p className={classes.Username}>@{this.props.profileInfo.username}</p>
         <table className={classes.Table}>
           <tbody>
              <tr>
                <td className={classes.TableTop}>{this.props.profileInfo.followers}</td>
                <td className={classes.TableBottom}>{this.props.profileInfo.following}</td>
              </tr>
              <tr>
                <td>Followers</td>
                <td>Following</td>
              </tr>
            </tbody>
         </table>
         <button 
          className={classes.FollowButton}
          onClick={this.followHandleClick}
          value={this.props.profileInfo.username}>Follow</button>
         <div>
           {this.props.profileInfo.bio}
         </div>
       </div>)
    }

    return (
      <Aux>
      {info}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
     token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
