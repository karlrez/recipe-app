import React, { Component } from "react";
import Layout from "./UI/Layout/Layout";
import Login from "./Components/Login/Login";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import classes from "./App.module.css";

class App extends Component {
  componentDidMount() {
    // Collecting login info if available from local storage
    this.props.tryAutoSignIn();
  }

  render() {
    // Show home screen or prompt for login
    return (
      <div
        className={
          this.props.isAuthenticated ? classes.mainLayout : classes.mainLogin
        }
      >
        <div>{this.props.isAuthenticated ? <Layout /> : <Login />}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tryAutoSignIn: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
