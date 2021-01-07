import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { NavLink, Redirect } from "react-router-dom";
import classes from "./CreateUser.module.css";
import Spinner from "../../UI/Spinner/Spinner";

class CreateUser extends Component {
  state = {
    email: null,
    username: null,
    full_name: null,
    title: null,
    password: null,
    password2: null,
    bio: null,
    error: false,
    showHideSignUpButton: false,
  };

  handleChange = (event) => {
    let formValues = this.state;
    let name = event.target.name;
    let value = event.target.value;
    formValues[name] = value;
    this.setState({ formValues });

    if (this.state.password !== this.state.password2) {
      this.setState({ error: true });
    } else this.setState({ error: false });
  };

  handleImageChange = (e) => {
    this.setState({
      profile_pic: e.target.files[0],
      imagePreview: URL.createObjectURL(e.target.files[0]),
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    if (this.state.password !== this.state.password2) {
      return;
    }

    let form_data = new FormData();
    form_data.append("email", this.state.email);
    form_data.append("username", this.state.username);

    if (this.state.full_name)
      form_data.append("full_name", this.state.full_name);

    if (this.state.title) form_data.append("title", this.state.title);
    form_data.append("password", this.state.password);

    if (this.state.bio) form_data.append("bio", this.state.bio);

    if (this.state.profile_pic)
      form_data.append("profile_pic", this.state.profile_pic);
    this.props.createUser(form_data);
  };

  render() {
    let errorMessage;
    if (this.state.error) {
      errorMessage = <span>Passwords do not match</span>;
    }

    let errorMessage2;

    if (this.props.loading) {
      errorMessage2 = (
        <Spinner />
      );
    }

    if (this.props.error) {
      errorMessage2 = <span>{this.props.error}</span>;
    } else if (this.props.redirect) {
      errorMessage2 = (
        <span className={classes.errorMessage} onClick={this.props.hideSignUp}>
          Success! <NavLink to="#">Go to login</NavLink>
        </span>
      );
    }

    let redirect = null;
    if (this.props.redirect) {
      redirect = <Redirect to={this.props.redirect} />;
    }

    let imagePreview = null;
    if (this.state.imagePreview) {
      imagePreview = (
        <img
          src={this.state.imagePreview}
          alt="preview"
          className={classes.ImgPreview}
        />
      );
    }

    return (
      <div className={classes.wrapper}>
        {redirect}
        <h1>Sign Up</h1>
        <form onSubmit={this.submitHandler} className={classes.CreateUserForm}>
          <input
            className={classes.formInput}
            type="email"
            name="email"
            required
            placeholder="Email"
            onChange={this.handleChange}
          />
          <p></p>
          <input
            className={classes.formInput}
            name="username"
            required
            placeholder="username"
            onChange={this.handleChange}
          />
          <p></p>
          <input
            className={classes.formInput}
            name="full_name"
            placeholder="Full Name"
            onChange={this.handleChange}
          />
          <p></p>
          <input
            className={classes.formInput}
            name="title"
            placeholder=" Title: Head Chef, Master Cook, etc"
            onChange={this.handleChange}
          />
          <p></p>
          <input
            className={classes.formInput}
            type="password"
            name="password"
            required
            placeholder="password"
            onChange={this.handleChange}
          />
          <p></p>
          <input
            className={classes.formInput}
            type="password"
            name="password2"
            required
            placeholder="Confirm Password"
            onChange={this.handleChange}
          />
          <p style={{ color: "red" }}>{errorMessage}</p>
          <textarea
            className={classes.formInput}
            rows="6"
            name="bio"
            placeholder="A short bio"
            onChange={this.handleChange}
          />
          <p></p>
          <label>
            Profile Pic
            <br />
            {imagePreview}
            <br />
            <input
              className={classes.formInput}
              name="profile_pic"
              type="file"
              accept="image/png, image/jpeg"
              onChange={this.handleImageChange}
            />
          </label>
          <p></p>
          <div>{errorMessage2}</div>
          <div className={classes.submitDiv}>
            <input
              type="submit"
              value="Submit"
              className={classes.submitBtn}
            ></input>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.createUser.error,
    redirect: state.createUser.redirectPath,
    loading: state.createUser.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (data) => dispatch(actions.createUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
