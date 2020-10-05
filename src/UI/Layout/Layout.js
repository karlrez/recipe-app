import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import classes from './Layout.module.css';
import Login from '../../Components/Login/Login';
import Logout from '../../Components/Logout/Logout';
import CreateUser from '../../Components/CreateUser/CreateUser';
import ModifyUser from '../../Components/ModifyUser/ModifyUser';
import Home from '../../Components/Home/Home';
import Toolbar from '../Toolbar/Toolbar';
import Navbar from '../Navbar/Navbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import OtherProfile from '../../Components/Profile/OtherProfile';
import Search from '../../Components/Search/Search';
import Add from '../../Components/Add/Add';
import Popular from '../../Components/Popular/Popular';
import Profile from '../../Components/Profile/Profile';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  componentDidMount() {
    // Collecting login info if available from local storage
    this.props.tryAutoSignIn();
  }

  sideDrawerClosedHandler = () => {
    this.setState( { showSideDrawer: false } );
  }

  sideDrawerToggleHandler = () => {
    this.setState( ( prevState ) => {
        return { showSideDrawer: !prevState.showSideDrawer };
    } );
  }
  
  render() {
    let routes = (
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/create-user" exact component={CreateUser} />
        <Route path="/modify-user" exact component={ModifyUser} />
        <Route path="/user/:username" component= {OtherProfile} />
        <Route path="/search" exact component= {Search} />
        <Route path="/add" exact component= {Add} />
        <Route path="/popular" exact component= {Popular} />
        <Route path="/profile" exact component= {Profile} />
        <Route path="/home" exact component={Home} />
        
        <Redirect to="/home" />
      </Switch>
    );

    return (
      <div className={classes.wrapper}>
        <div className={classes.main}>
          <Toolbar
            drawerToggleClicked={this.sideDrawerToggleHandler} />
          <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler} />
          <Navbar />
          <div className={classes.routesDiv}>{routes}</div>
        </div>
      </div>
  );
  }
}
const mapStateToProps = state => {
  return {
    sp: state.navbar.selectedPage,
    token: state.auth.token,
    username: state.profileInfo.username,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tryAutoSignIn: () => dispatch(actions.authCheckState()),
    getProfileInfo: (token) => dispatch(actions.profileInfo(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
