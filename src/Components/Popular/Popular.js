import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import * as actionTypes from '../../store/actions/actionTypes';
import Posts from '../Posts/Posts';
import { Redirect } from 'react-router-dom';

class Popular extends Component {
  state = {
    redirect: null,
  }

  componentDidMount() {
    this.props.getPopularRecipes();
    
    if (this.props.sp !== 4) {
      this.props.selectPopularPage();
    }
  }

  usernameHandleClick = (e) => {
    e.preventDefault();
    let redirectPath = "/user/" + e.target.value;
    this.setState({redirect: redirectPath});
  } 

  render() {
    let redirect = null;
      if (this.state.redirect) {
        redirect = <Redirect to={this.state.redirect} />
      }

    let posts = null;
      if (!this.props.recipes) {
        posts = (<div>Loading...</div>)
      } else {
        posts = (
          <Posts recipes={this.props.recipes}
          onClick={(e) => this.usernameHandleClick(e)} />
        )
      }
    return (
      <Aux>
        {redirect}
        {posts}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
      recipes: state.popularRecipes.recipes,
  };
};

const mapDispatchToProps = dispatch => {
    return {
      selectPopularPage: () => dispatch({type: actionTypes.POPULAR_PAGE}),
      getPopularRecipes: () => dispatch(actions.popularRecipes()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popular);
