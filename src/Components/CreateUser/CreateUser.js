import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import classes from './CreateUser.module.css';


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
      profile_pic: e.target.files[0],
      imagePreview: URL.createObjectURL(e.target.files[0])
    })
  };

  submitHandler = (event) => {
    event.preventDefault();
    if (this.state.password !== this.state.password2) {
      return;
    }

    let form_data = new FormData();
    form_data.append('email', this.state.email);
    form_data.append('username', this.state.username);
    form_data.append('full_name', this.state.full_name);
    form_data.append('title', this.state.title);
    form_data.append('password', this.state.password);
    form_data.append('bio', this.state.bio);
    form_data.append('profile_pic', this.state.profile_pic);
    this.props.createUser(form_data);
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

    let imagePreview = null;
    if (this.state.imagePreview) {
      imagePreview = (<img src={this.state.imagePreview} alt="preview" className={classes.ImgPreview} />)
    }

    return (
      <Aux>
        {redirect}
        <h1>Sign Up</h1>
        <form onSubmit={this.submitHandler} className={classes.CreateUserForm}>
                <input
                className={classes.formInput}
                type="email"
                name="email"
                required
                placeholder="Email"
                onChange= {this.handleChange} />
            <p></p>
                <input
                className={classes.formInput}
                name="username"
                required
                placeholder="username"
                onChange= {this.handleChange} />
            <p></p>
                <input
                className={classes.formInput}
                name="full_name"
                placeholder="Full Name"
                onChange= {this.handleChange} />
            <p></p>
                <input
                className={classes.formInput}
                name="title"
                placeholder=" Title: Head Chef, Master Cook, etc"
                onChange= {this.handleChange} />
            <p></p>
                <input
                className={classes.formInput}
                type="password"
                name="password"
                required
                placeholder="password"
                onChange= {this.handleChange} />
            <p></p>
                <input
                className={classes.formInput}
                type="password"
                name="password2"
                required
                placeholder="Confirm Password"
                onChange= {this.handleChange} />
            <p style={{color: "red"}}>{errorMessage}</p>
                <textarea
                className={classes.formInput}
                rows="6"
                name="bio"
                placeholder="A short bio"
                onChange= {this.handleChange} />
            <p></p>
            <label>Profile Pic
                <br/>{imagePreview}<br/>
                <input
                className={classes.formInput}
                name="profile_pic"
                type="file"
                accept="image/png, image/jpeg"
                onChange= {this.handleImageChange} />
            </label><p></p>

            <div className={classes.submitDiv}>
              <input type="submit" value="Submit" className={classes.submitBtn}></input>
            </div>
            </form>
            <p>{errorMessage2}</p>
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
        createUser: (data) => dispatch(actions.createUser(data)),
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
