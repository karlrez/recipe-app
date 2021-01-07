import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  id: null,
  user: null,
  name: null,
  ingredients: null,
  tags: null,
  time_hours: null,
  price: null,
  instructions: null,
  image: null,
  date: null,
  likes: false,
  loading: false,
  loaded: false,
  error: false,
};

const recipeDetailStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const recipeDetailSuccess = (state, action) => {
  return updateObject(state, {
    id: action.id,
    user: action.user,
    name: action.name,
    ingredients: action.ingredients,
    tags: action.tags,
    time_hours: action.time_hours,
    price: action.price,
    instructions: action.instructions,
    image: action.image,
    date: action.date,
    likes: action.likes,
    error: null,
    loading: false,
    loaded: true,
  });
};

const recipeDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECIPE_DETAIL_START:
      return recipeDetailStart(state, action);
    case actionTypes.RECIPE_DETAIL_SUCCESS:
      return recipeDetailSuccess(state, action);
    case actionTypes.RECIPE_DETAIL_FAIL:
      return recipeDetailFail(state, action);
    default:
      return state;
  }
};

export default reducer;
