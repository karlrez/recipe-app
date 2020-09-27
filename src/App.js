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

class App extends Component {
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
        <Route path="/" exact component={Home} />
        
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div className={classes.main}>
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler} />
        <Navbar />
        <div className={classes.routesDiv}>{routes}</div>
      </div>
  );
  }
}
const mapStateToProps = state => {
  return {
    sp: state.navbar.selectedPage,
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tryAutoSignIn: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
