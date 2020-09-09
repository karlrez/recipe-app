import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';


class CreateUser extends Component {
  state = {
    email: null,
    username: null,
    fullName: null,
    title: null,
    password: null,
    password2: null,
    bio: null,
    profilePic: null,
    error: false,
  }

  handleChange = (event) => {
    let formValues = this.state;
      let name = event.target.name;
      let value = event.target.value;
      formValues[name] = value;
      this.setState({formValues});

      if (this.state.password !== this.state.password2) {
        this.setState({error: true});
      } else this.setState({error: false});
  }

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.createUser('user/create/', this.state);
  }


  render() {
    let errorMessage;
    if (this.state.error) {
      errorMessage = (<p>Passwords do not match</p>);
    }

    let errorMessage2;
    if (this.props.error) {
        errorMessage2 = (<p>{this.props.error}</p>);
      }

    let redirect = null;
        if (this.props.redirect) {
            redirect = <Redirect to={this.props.redirect} />
        }

    return (
      <Aux>
          {redirect}
        <form onSubmit={this.submitHandler}>
            <label>Email
                <input
                type="email"
                name="email"
                required
                onChange= {this.handleChange} />
            </label><p></p>
            <label>Username
                <input
                name="username"
                required
                onChange= {this.handleChange} />
            </label><p></p>
            <label>Full Name
                <input
                name="fullName"
                onChange= {this.handleChange} />
            </label><p></p>
            <label>Title
                <input
                name="title"
                placeholder="Head Chef, Master Cook, etc"
                onChange= {this.handleChange} />
            </label><p></p>
            <label>Password
                <input
                type="password"
                name="password"
                required
                onChange= {this.handleChange} />
            </label><p></p>
            <label>Confirm Password
                <input
                type="password"
                name="password2"
                required
                onChange= {this.handleChange} />
            </label><p>{errorMessage}</p>
            <label>Bio
                <input
                name="bio"
                onChange= {this.handleChange} />
            </label><p></p>
            <label>Profile Pic
                <input
                name="profilePic"
                type="file"
                accept="image/png, image/jpeg"
                onChange= {this.handleImageChange} />
            </label><p></p>

            <input type="submit" value="Submit"></input>
            </form>
            {errorMessage2}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
    return {
        error: state.createUser.error,
        redirect: state.createUser.redirectPath,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        createUser: (url, data) => dispatch(actions.createUser(url, data)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
