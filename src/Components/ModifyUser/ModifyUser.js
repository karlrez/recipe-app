import React, { Component } from "react";
import Aux from "../../UI/AuxFolder/Auxiliary";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import classes from "./ModifyUser.module.css";

class ModifyUser extends Component {
  state = {
    username: null,
    full_name: null,
    title: null,
    bio: null,
  };

  componentDidMount() {
    if (this.props.token) {
      this.props.getProfileInfo(this.props.token);
    }
  }

  handleChange = (event) => {
    let formValues = this.state;
    let name = event.target.name;
    let value = event.target.value;
    formValues[name] = value;
    this.setState({ formValues });
  };

  handleImageChange = (e) => {
    this.setState({
      profile_pic: e.target.files[0],
    });
  };

  submitHandler = (event) => {
    event.preventDefault();

    let form_data = new FormData();
    if (this.state.username) {
      form_data.append("username", this.state.username);
    }
    if (this.state.full_name) {
      form_data.append("full_name", this.state.full_name);
    }
    if (this.state.title) {
      form_data.append("title", this.state.title);
    }
    if (this.state.bio) {
      form_data.append("bio", this.state.bio);
    }
    if (this.state.profile_pic) {
      form_data.append("profile_pic", this.state.profile_pic);
    }

    this.props.modifyUser(form_data, this.props.token);
  };

  render() {
    let successMessage;
    if (this.props.successMessage) {
      successMessage = <p>Success!</p>;
    }
    let errorMessage;
    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>;
    }
    return (
      <div className={classes.Wrapper}>
        <h1>Modify User</h1>
        <form onSubmit={this.submitHandler} className={classes.Form}>
          <input
            className={classes.formInput}
            name="username"
            placeholder="Username"
            required
            defaultValue={this.props.username}
            onChange={this.handleChange}
          />

          <p></p>

          <input
            className={classes.formInput}
            name="full_name"
            placeholder="Full Name"
            defaultValue={this.props.full_name}
            onChange={this.handleChange}
          />

          <p></p>

          <input
            className={classes.formInput}
            name="title"
            className="Title"
            placeholder="Head Chef, Master Cook, etc"
            defaultValue={this.props.title}
            onChange={this.handleChange}
          />

          <p></p>

          <input
            className={classes.formInput}
            name="bio"
            placeholder="Bio"
            defaultValue={this.props.bio}
            onChange={this.handleChange}
          />

          <p></p>

          <input
            className={classes.formInput}
            name="profile_pic"
            placeholder="Profile Pic"
            type="file"
            accept="image/png, image/jpeg"
            onChange={this.handleImageChange}
          />

          <p></p>

          <div className={classes.submitDiv}>
            <input
              type="submit"
              value="Submit"
              className={classes.submitBtn}
            ></input>
          </div>
        </form>

        {successMessage}
        {errorMessage}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    username: state.profileInfo.username,
    full_name: state.profileInfo.full_name,
    title: state.profileInfo.title,
    bio: state.profileInfo.bio,
    profile_pic: state.profileInfo.profile_pic,
    successMessage: state.modifyUser.showSuccess,
    error: state.modifyUser.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfileInfo: (token) => dispatch(actions.profileInfo(token)),
    modifyUser: (data, token) => dispatch(actions.modifyUser(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyUser);
