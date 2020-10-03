import React, { Component } from 'react';
import Aux from '../../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import classes from './Header.module.css';
import axios from '../../../axios';
import Modal from '../../../UI/Modal/Modal';
import * as actions from '../../../store/actions/index';

class Header extends Component {
  state = {
    showModal: false,
    user: null, // user for who we want to get followers for 
    modalFollowers: null, // true if modal displays followers, false for following list
  }

  componentDidMount() {
    if (this.props.token) {
      this.props.getProfileInfo(this.props.token);
    }
  }

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
                alert(response.data.follow);
            })
            .catch(err => {
                console.log(err.response);
            });
  }

  // Clicking on follow/followers will display list in modal
  showModalHandler = (user, getFollowers) => {
    let currentState = this.state.showModal;
    this.setState({
      showModal: !currentState,
      user: user,
      modalFollowers: getFollowers});

    this.props.getFollowers(user, getFollowers);
    }

  hideModalHandler = () => {
    this.setState({
      showModal: false,
      user: null,
      modalFollowers: null});
  }

  render() {
    let modal;
    if (this.state.showModal && !this.props.followersLoading) {
      modal = (
        <Modal
          show="true"
          closed={this.hideModalHandler}
          showFollowers = "true" />);
    }

    return (
      <Aux>
      <div className={classes.Header}>
         <img src={this.props.profileInfo.profile_pic} className={classes.ProfilePic} alt="profile-pic"/>
         <p className={classes.FullName}>{this.props.profileInfo.full_name}</p>
         <p className={classes.Username}>@{this.props.profileInfo.username}</p>
         <table className={classes.Table}>
           <tbody>
              <tr>
                <td onClick={() => this.showModalHandler(this.props.profileInfo.username, true)} className={classes.TableTop}>{this.props.profileInfo.followers}</td>
                <td onClick={() => this.showModalHandler(this.props.profileInfo.username, false)} className={classes.TableTop}>{this.props.profileInfo.following}</td>
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
          value={this.props.profileInfo.username}> Follow
         </button>
         <div className={classes.BioDiv}>
           {this.props.profileInfo.bio}
         </div>
       </div>

      {modal}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
     token: state.auth.token,
     followersLoading: state.getFollowers.loading,
     myProfileInfo: state.profileInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      getFollowers: (user, getFollowers) => dispatch(actions.getFollowers(user, getFollowers)),
      getProfileInfo: (token) => dispatch(actions.profileInfo(token)),
  };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
