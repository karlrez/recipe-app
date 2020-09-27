import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import Posts from '../Posts/Posts';
import UserList from '../UserList/UserList';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import * as actionTypes from '../../store/actions/actionTypes';

class Search extends Component {
  state = {
    checked: "tag",
    searchInput: null,
    ingredient1: null,
    ingredient2: null,
    ingredient3: null,
    showPosts: true,
    redirect: null,
  }

  componentDidMount() {
    this.props.getSearchRecipes('recipes/all-recipes/');
    
    if (this.props.sp !== 2) {
      this.props.selectSearchPage();
    }
  }

  usernameHandleClick = (e) => {
    e.preventDefault();
    let redirectPath = "/user/" + e.target.value;
    this.setState({redirect: redirectPath});
  } 

  handleChange = (event) => {
    let formValues = this.state;
      let name = event.target.name;
      let value = event.target.value;
      formValues[name] = value;
      this.setState({formValues})
  }

  submitHandler = (event) => {
    event.preventDefault();
    if (this.state.checked === "tag") {
      this.props.recipeQuery('/recipes/tag/' + this.state.searchInput + '/');
      this.setState({showPosts:true});
    } else if (this.state.checked === "name") {
      this.props.recipeQuery('/recipes/name/' + this.state.searchInput + '/');
      this.setState({showPosts:true});
    } else if (this.state.checked === "ingredients") {
      let ingred1 = this.state.ingredient1;
      let ingred2 = this.state.ingredient2 ? '/' + this.state.ingredient2 + '/' : "";
      let ingred3 = this.state.ingredient3 ? this.state.ingredient3 + '/' : "";
      this.props.recipeQuery('recipes/ingredients/' + ingred1 + ingred2 + ingred3);
      this.setState({showPosts:true});
    } else if (this.state.checked === "user") {
      let username = this.state.searchInput;
      this.props.usersQuery('/user/search-users/' + username);
      this.setState({showPosts:false});
    }
  }

  render() {
    let searchPlaceholder;
    let searchInput;
    switch (this.state.checked) {
      case ("tag"):
        searchPlaceholder = "Search by #tag...";
        searchInput = (
          <input
          name="searchInput"
          placeholder={searchPlaceholder}
          onChange= {this.handleChange}/>
        );
        break;
      case ("name"):
        searchPlaceholder = "Search by recipe name...";
        searchInput = (
          <input
            name="searchInput"
            placeholder={searchPlaceholder}
            onChange= {this.handleChange}/>
        )
        break;
      case ("ingredients"):
        searchPlaceholder = "Search by up to 3 ingredients...";
        searchInput = (
          <div>
            <input
            name="ingredient1"
            placeholder="ingredient1"
            onChange= {this.handleChange}/><p></p>
            <input
            name="ingredient2"
            placeholder="ingredient2"
            onChange= {this.handleChange}/><p></p>
            <input
            name="ingredient3"
            placeholder="ingredient3"
            onChange= {this.handleChange}/><p></p>
          </div>
        );
        break;
      case ("user"):
        searchPlaceholder = "Search for a user...";
        searchInput = (
          <input
          name="searchInput"
          placeholder={searchPlaceholder}
          onChange= {this.handleChange}/>
        );
        break;
      default:
        break;
    }

    let searchMessage = null;
    if (this.props.recipes < 1 && this.state.showPosts) {
      searchMessage = (
        <p>Search returned no recipes! :(</p>
      )
    }else if (this.props.users.length < 1 && !this.state.showPosts) {
      searchMessage = (
        <p>Search returned no users! :(</p>
      )
    }

    let showPosts = null;
    if (this.props.recipesLoading) {
      showPosts = (<div>Loading...</div>)
    } else if (this.props.usersLoading) {
      showPosts = (<div>Loading...</div>)
    } else {
      showPosts = (
        <Posts
          recipes={this.props.recipes}
          onClick={(e) => this.usernameHandleClick(e)} />
      )
    }
    if (!this.state.showPosts) {
      showPosts = (<UserList />);
    }

    let redirect = null;
      if (this.state.redirect) {
          redirect = <Redirect to={this.state.redirect} />
      }

    return (
      <Aux>
        {redirect}
        {searchInput}
        <form onSubmit={this.submitHandler}>
          <label>Tag
            <input
              type="radio"
              name="checked"
              value="tag"
              checked={this.state.checked === "tag"}
              onChange= {this.handleChange} />
          </label>
          <label>Name
            <input
              type="radio"
              name="checked"
              value="name"
              checked={this.state.checked === "name"}
              onChange= {this.handleChange} />
          </label>
          <label>Ingredients
            <input
              type="radio"
              name="checked"
              value="ingredients"
              checked={this.state.checked === "ingredients"}
              onChange= {this.handleChange} />
          </label>
          <label>User
            <input
              type="radio"
              name="checked"
              value="user"
              checked={this.state.checked === "user"}
              onChange= {this.handleChange} />
          </label>

            <input type="submit" value="Search!"></input>
        </form>
        
        {searchMessage}
        {showPosts}
        
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    sp: state.navbar.selectedPage,
    loaded: state.searchRecipes.loaded,
    recipes: state.searchRecipes.recipes,
    users: state.searchUsers.users,
    recipesLoading: state.searchRecipes.loading,
    usersLoading: state.searchRecipes.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectSearchPage: () => dispatch({type: actionTypes.SEARCH_PAGE}),
    getSearchRecipes: (url) => dispatch(actions.searchRecipes(url)),
    recipeQuery: (url) => dispatch(actions.searchRecipes(url)),
    usersQuery: (url) => dispatch(actions.searchUsers(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
