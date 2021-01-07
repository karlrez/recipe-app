import axios from "../../axios";
import * as actionTypes from "./actionTypes";

export const recipeDetail = (id) => {
  return (dispatch) => {
    dispatch(recipeDetailStart());

    axios
      .get(`/recipes/retrieve-update/${id}`)
      .then((response) => {
        console.log("recipeDetail: \n" + JSON.stringify(response.data));
        dispatch(recipeDetailSuccess(response.data));
      })
      .catch((err) => {
        //console.log(err.response); //more detailed error info
        console.log(err.response);
        dispatch(recipeDetailFail(err));
      });
  };
};

export const recipeDetailStart = () => {
  return {
    type: actionTypes.RECIPE_DETAIL_START,
  };
};

export const recipeDetailSuccess = (data) => {
  return {
    type: actionTypes.RECIPE_DETAIL_SUCCESS,
    id: data.id,
    user: data.user,
    name: data.name,
    ingredients: data.ingredients,
    tags: data.tags,
    time_hours: data.time_hours,
    price: data.price,
    instructions: data.instructions,
    image: data.image,
    date: data.date,
    likes: data.likes,
  };
};

export const recipeDetailFail = (error) => {
  return {
    type: actionTypes.RECIPE_DETAIL_FAIL,
    error: error,
  };
};
