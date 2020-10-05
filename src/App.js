import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import classes from './App.module.css';
import Login from './Components/Login/Login';
import Logout from './Components/Logout/Logout';
import CreateUser from './Components/CreateUser/CreateUser';
import ModifyUser from './Components/ModifyUser/ModifyUser';
import Home from './Components/Home/Home';
import Toolbar from './UI/Toolbar/Toolbar';
import Navbar from './UI/Navbar/Navbar';
import SideDrawer from './UI/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import OtherProfile from './Components/Profile/OtherProfile';
import Search from './Components/Search/Search';
import Add from './Components/Add/Add';
import Popular from './Components/Popular/Popular';
import Profile from './Components/Profile/Profile';
import Aux from './UI/AuxFolder/Auxiliary';
import Layout from './UI/Layout/Layout';
import { NavLink } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Layout />
  );
  }
}

export default App;
