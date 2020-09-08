import axios from '../../axios';
import * as actionTypes from './actionTypes';


export const searchRecipes = (url) => {
    return dispatch => {
        dispatch(searchRecipesStart());
        console.log(url);
        axios.get(url)
            .then(response => {
                console.log("searchRecipes: \n" + JSON.stringify(response.data));
                dispatch(searchRecipesSuccess(response.data));
            })
            .catch(err => {
                //console.log(err.response); //more detailed error info
                //console.log(err.response.request.responseText);
                console.log(err.response);
                dispatch(searchRecipesFail(err.response));
            });
    };
};

export const searchRecipesStart = () => {
    return {
        type: actionTypes.SEARCH_RECIPES_START
    };
};

export const searchRecipesSuccess = (data) => {
    return {
        type: actionTypes.SEARCH_RECIPES_SUCCESS,
        recipes: data
    };
};

export const searchRecipesFail = (error) => {
    return {
        type: actionTypes.SEARCH_RECIPES_FAIL,
        loading: false,
        error: error
    };
};
