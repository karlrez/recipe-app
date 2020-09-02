import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import classes from './Profile.module.css';
import Header from './Header/Header';
import Posts from '../Posts/Posts';

class Profile extends Component {
  render() {
    return (
      <Aux>
      this is profile page
      <Header />
      <Posts />
      </Aux>
    )
  }
}

export default Profile;
