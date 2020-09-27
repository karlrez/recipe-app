import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Aux from '../../UI/AuxFolder/Auxiliary';
import * as actions from '../../store/actions/index';
import classes from './Login.module.css';
import { NavLink } from 'react-router-dom';

class Login extends Component {
    state = {
        email: "",
        password: "",
        back: false
    }

    componentDidMount() {
      this.props.onSetAuthRedirectPath();
  }

    handleChange = event =>{
      event.preventDefault();
      let formValues = this.state;
      let name = event.target.name;
      let value = event.target.value;
      formValues[name] = value;
      this.setState({formValues})
      }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.email, this.state.password);
    }

    backButtonHandler = (event) => {
      this.setState({
        back:true
      })
    }

  render() {
    let authRedirect = null;
        if (this.props.isAuthenticated || this.state.back === true) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

    return (
      <Aux>
        {authRedirect}
        <div className={classes.wrapper}>
          <h1 className={classes.title}>RecipeGram</h1>
          <form onSubmit={this.submitHandler}>
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                onChange= {this.handleChange}
                className={classes.inputText} />
            <br />
              <input
                name="password"
                type="password"
                placeholder="password"
                required
                onChange= {this.handleChange}
                className={classes.inputText} /><p></p>
            <input type="submit" value="Login" className={classes.inputBtn}></input>
          </form><p></p>
          <p>Dont have an account?&nbsp;
            <NavLink 
              to="/create-user">
                Create an account. 
            </NavLink>
          </p>
        </div>

        {this.props.error ?
          <p>{this.props.error}</p> : null}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuthenticated: state.auth.token !== null,
      authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
