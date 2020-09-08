import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import Posts from '../Posts/Posts';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Search extends Component {
  state = {
    searchInput: null,
    checked: "tag",
    searchInput: null,
    ingredient1: null,
    ingredient2: null,
    ingredient3: null,
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
    } else if (this.state.checked === "name") {
      this.props.recipeQuery('/recipes/name/' + this.state.searchInput + '/');
    } else if (this.state.checked === "ingredients") {
      let ingred1 = this.state.ingredient1;
      let ingred2 = this.state.ingredient2 ? '/' + this.state.ingredient2 + '/' : "";
      let ingred3 = this.state.ingredient3 ? this.state.ingredient3 + '/' : "";
      this.props.recipeQuery('recipes/ingredients/' + ingred1 + ingred2 + ingred3);
    }
  }

  render() {
    let searchPlaceholder;
    let searchInput;
    switch (this.state.checked) {
      case ("tag"):
        searchPlaceholder = "Search by #tags...";
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
    }

    let searchMessage = null;
    if (this.props.recipes === null) {
      searchMessage = (
        <p>Search returned no recipes! :(</p>
      )
    }

    return (
      <Aux>
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

            <input type="submit" value="Search!"></input>
        </form>
        
        {searchMessage}
        <Posts />
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
      recipes: state.searchRecipes.recipes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      recipeQuery: (url) => dispatch(actions.searchRecipes(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
