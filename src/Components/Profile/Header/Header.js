import React, { Component } from 'react';
import Aux from '../../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import classes from './Header.module.css';
import * as actions from '../../../store/actions/index';

class Header extends Component {
  state = {

  }

  componentDidMount() {
    if (this.props.token !== null && this.props.loaded === false) {
      this.props.getProfileInfo(this.props.token);
    }
  }

  render() {
    let info = null;
    if (this.props.username) {
       info = (
       <div className={classes.Header}>
         <img src={this.props.profile_pic} className={classes.ProfilePic}/>
         <p className={classes.FullName}>{this.props.full_name}</p>
         <p className={classes.Username}>@{this.props.username}</p>
         <table className={classes.Table}>
           <tr>
             <td className={classes.TableTop}>{this.props.followers}</td>
             <td className={classes.TableBottom}>{this.props.following}</td>
           </tr>
           <tr>
             <td>Followers</td>
             <td>Following</td>
           </tr>
         </table>
         <button className={classes.FollowButton}>Follow</button>
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
      username: state.profileInfo.username,
      full_name: state.profileInfo.full_name,
      title: state.profileInfo.title,
      bio: state.profileInfo.bio,
      followers: state.profileInfo.followers,
      following: state.profileInfo.following,
      date_joined: state.profileInfo.date_joined,
      profile_pic: state.profileInfo.profile_pic,
      error: state.profileInfo.error,
      loading: state.profileInfo.error,
      loaded: state.profileInfo.loaded,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      getProfileInfo: (token) => dispatch(actions.profileInfo(token, '/manage/profile/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
