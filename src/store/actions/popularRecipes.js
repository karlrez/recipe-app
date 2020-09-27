import axios from '../../axios';
import * as actionTypes from './actionTypes';


export const popularRecipes = () => {
    return dispatch => {
        dispatch(popularRecipesStart());

        axios.get('/recipes/popular/')
            .then(response => {
                console.log("popularRecipes: \n" + JSON.stringify(response.data));
                dispatch(popularRecipesSuccess(response.data));
            })
            .catch(err => {
                //console.log(err.response); //more detailed error info
                //console.log(err.response.request.responseText);
                console.log(err.response);
                dispatch(popularRecipesFail(err.response));
            });
    };
};

export const popularRecipesStart = () => {
    return {
        type: actionTypes.POPULAR_RECIPES_START
    };
};

export const popularRecipesSuccess = (data) => {
    return {
        type: actionTypes.POPULAR_RECIPES_SUCCESS,
        recipes: data
    };
};

export const popularRecipesFail = (error) => {
    return {
        type: actionTypes.POPULAR_RECIPES_FAIL,
        loading: false,
        error: error
    };
};
