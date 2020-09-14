import React, { Component } from 'react';
import Aux from '../../UI/AuxFolder/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Add.module.css';
import axios from '../../axios';


class Add extends Component {
  state = {
    id: null,
    name: "",
    time_minutes: 0,
    time_hours: 0,
    price: 0,
    link: "", // could add this in later
    instructions: "",
    ingredient: "",
    ingredientsList: [], // ingredients as Strings
    ingredients: [], // ingredients as id's (used for api)
    tag: "",
    tagsList: [],
    tags: [],
    image: null,
  }

  componentDidMount() {
    if (this.props.token !== null && this.props.userInfoLoaded === false) {
      this.props.getProfileInfo(this.props.token);
    }
  }

  handleImageChange = (e) => {
    console.log(JSON.stringify(this.state));
    this.setState({
      image: e.target.files[0]
    })
  };

  ingredientChange = (event) => {
    this.setState({
      ingredient: event.target.value
    });
  }

  tagChange = (event) => {
    this.setState({
      tag: event.target.value
    });
  }

  handleChange = (event) => {
    let formValues = this.state;
      let name = event.target.name;
      let value = event.target.value;
      formValues[name] = value;
      this.setState({formValues});
  }

  getIngredientID = (ingredient) => {
    axios.get('recipes/ingredient-detail/' + ingredient)
            .then(response => {
                console.log(response.data.id);
                this.setState({
                  ingredients: [...this.state.ingredients, response.data.id]
                });
            })
            .catch(err => {
                console.log(err.response);
                let data = {name: ingredient};
                axios.post('recipes/view-create-ingredients/', data)
                  .then(response => {
                    console.log(response.data.id);
                    this.setState({
                      ingredients: [...this.state.ingredients, response.data.id]
                    });
                  })
                  .catch(err => {
                    console.log(err.response);
                    return null;
                  })
            });
  }

  getTagID = (tag) => {
    axios.get('recipes/tag-detail/' + tag)
            .then(response => {
                console.log(response.data.id);
                this.setState({
                  tags: [...this.state.tags, response.data.id]
                });
            })
            .catch(err => {
                console.log(err.response);
                let data = {name: tag};
                axios.post('recipes/view-create-tags/', data)
                  .then(response => {
                    console.log(response.data.id);
                    this.setState({
                      tags: [...this.state.tags, response.data.id]
                    });
                  })
                  .catch(err => {
                    console.log(err.response);
                    return null;
                  })
            });
  }

  ingredientAddBtnHandler = (event) => {
    event.preventDefault();
    this.refs.ingred.value="";

    // Dont want empty inputs
    if (this.state.ingredient.trim() === "") {
      return;
    }

    // No duplicate inputs
    for (let i=0; i<this.state.ingredientsList.length; i++) {
      if (this.state.ingredientsList[i] === this.state.ingredient) {
        alert("You already added that ingredient!");
        return;
      }
    }

    this.setState({
      ingredientsList: [...this.state.ingredientsList, this.state.ingredient]
    });

    this.getIngredientID(this.state.ingredient);
  }

  tagAddBtnHandler = (event) => {
    event.preventDefault();
    this.refs.tag.value="";

    // No empty inputs
    if (this.state.tag.trim() === "") {
      return;
    }

    // No duplicate inputs
    for (let i=0; i<this.state.tagsList.length; i++) {
      if (this.state.tagsList[i] === this.state.tag) {
        alert("You already added that tag!");
        return;
      }
    }

    this.setState({
      tagsList: [...this.state.tagsList, this.state.tag]
    });

    this.getTagID(this.state.tag);
  }

  ingredientRemoveBtnHandler = (event) => {
    event.preventDefault();
    // Also Removing element from ingredients[]
    let newIngredients = this.state.ingredients;
    for (let i=0; i<=this.state.ingredientsList.length; i++) {
      if (this.state.ingredientsList[i] === event.target.value) {
        newIngredients.splice(i, 1);
      }
    }
    this.setState({ingredients: newIngredients});
      
    // Removing from ingredientsList[]
    const newList = this.state.ingredientsList.filter((ingredient) => ingredient !== event.target.value);
    this.setState({ingredientsList: newList});
  }

  tagRemoveBtnHandler = (event) => {
    event.preventDefault();
    // Also Removing element from tags[]
    let newTags = this.state.tags;
    for (let i=0; i<=this.state.tagsList.length; i++) {
      if (this.state.tagsList[i] === event.target.value) {
        newTags.splice(i, 1);
      }
    }
    this.setState({tags: newTags});
    
    // Removing from tagsList[]
    const newList = this.state.tagsList.filter((tag) => tag !== event.target.value); 
    this.setState({tagsList: newList});
  }
  
  submitHandler = (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append('id', this.props.userId);
    form_data.append('name', this.state.name);
    form_data.append('time_minutes', this.state.time_minutes);
    form_data.append('time_hours',this.state.time_hours);
    form_data.append('price',this.state.price);
    form_data.append('link',this.state.link);
    this.state.ingredients.forEach(item => {
      form_data.append('ingredients', item);
    });
    this.state.tags.forEach(item => {
      form_data.append('tags', item);
    });
    form_data.append('instructions',this.state.instructions);
    form_data.append('image',this.state.image);
    this.props.createRecipe(form_data, this.props.token);
  }


  render() {
    let addedIngreds = null;
    if (this.state.ingredientsList) {
      addedIngreds = 
        this.state.ingredientsList.map((ingred) => 
          <li>{ingred}<button onClick={this.ingredientRemoveBtnHandler} value={ingred}>Remove</button></li>
        )
    }

    let addedTags = null;
    if (this.state.tagsList) {
      addedTags = 
        this.state.tagsList.map((tag) => 
          <li>{tag}<button onClick={this.tagRemoveBtnHandler} value={tag}>Remove</button></li>
        )
    }

    let form = (
      <form onSubmit={this.submitHandler}>
      <label><span className={classes.asterisk}>*</span>Recipe Pic
              <input
              name="recipePic"
              type="file"
              accept="image/png, image/jpeg"
              required
              onChange= {this.handleImageChange} />
        </label><p></p>
        <label><span className={classes.asterisk}>*</span>Recipe Name
                <input
                //className={classes.formInput}
                name="name"
                required
                onChange= {this.handleChange} />
        </label><p></p>
        <label>Time (Mins)
                <input
                //className={classes.formInput}
                name="time_minutes"
                type="number"
                onChange= {this.handleChange} />
        </label><p></p>
        <label>Time (Hours)
                <input
                //className={classes.formInput}
                name="time_hours"
                type="number"
                onChange= {this.handleChange} />
        </label><p></p>
        <label>Price $
                <input
                //className={classes.formInput}
                name="price"
                type="number"
                min="0"
                step="any"
                onChange= {this.handleChange} />
        </label><p></p>
        <label><span className={classes.asterisk}>*</span>Ingredients
                <input
                //className={classes.formInput}
                name="ingredient"
                ref="ingred"
                onChange= {this.ingredientChange}/>
        </label>
        <button onClick={this.ingredientAddBtnHandler}>Add</button>
        <p></p>
        <ul>
          {addedIngreds}
        </ul>
        <label><span className={classes.asterisk}>*</span>Tags
                <input
                //className={classes.formInput}
                name="tag"
                ref="tag"
                onChange= {this.tagChange} />
        </label>
        <button onClick={this.tagAddBtnHandler}>Add</button>
        <p></p>
        <ul>
          {addedTags}
        </ul>
        <label>Instructions
                <textarea
                //className={classes.formInput}
                name="instructions"
                rows="5"
                cols="50"
                onChange= {this.handleChange} />
        </label><p></p>
        <div>
            <input type="submit" value="Submit"></input>
        </div>
        <p>Fields marked with <span className={classes.asterisk}>*</span> are required.</p>
      </form>
    )

    return (
      <Aux>
        <h2>Add Recipe</h2>
          {form}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userInfoLoaded: state.profileInfo.loaded,
    userId: state.profileInfo.id,
    error: state.createRecipe.error,
    loading: state.createRecipe.loading,
    showSuccess: state.createRecipe.showSuccess,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfileInfo: (token) => dispatch(actions.profileInfo(token)),
    createRecipe: (data, token) => dispatch(actions.createRecipe(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
