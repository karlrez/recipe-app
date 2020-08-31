import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Aux from '../../UI/AuxFolder/Auxiliary';
import * as actions from '../../store/actions/index';

class Logout extends Component {
    state = {
       back: false,
    }

    componentDidMount() {
      this.props.onSetAuthRedirectPath();
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.logout();
    }

    backButtonHandler = (event) => {
      this.setState({
        back:true
      })
    }

  render() {
    let authRedirect = null;
        if (!this.props.isAuthenticated || this.state.back === true) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

    return (
      <Aux>
        {authRedirect}
        <form onSubmit={this.submitHandler}>
          <label>
            Confirm Logout?
            <input type="submit" value="Yes"></input>
          </label>
        </form>
        <p></p>
        <button onClick={this.backButtonHandler}>Back</button>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
      loading: state.auth.loading,
      isAuthenticated: state.auth.token !== null,
      authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
