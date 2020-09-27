import axios from '../../axios';
import * as actionTypes from './actionTypes';


export const otherProfileRecipes = (username) => {
    return dispatch => {
        dispatch(otherProfileRecipesStart());

        axios.get('recipes/user/' + username)
            .then(response => {
                console.log("otherProfileRecipes: \n" + JSON.stringify(response.data));
                dispatch(otherProfileRecipesSuccess(response.data));
            })
            .catch(err => {
                //console.log(err.response); //more detailed error info
                //console.log(err.response.request.responseText);
                console.log(err.response);
                dispatch(otherProfileRecipesFail(err.response));
            });
    };
};

export const otherProfileRecipesStart = () => {
    return {
        type: actionTypes.OTHER_PROFILE_RECIPES_START
    };
};

export const otherProfileRecipesSuccess = (data) => {
    return {
        type: actionTypes.OTHER_PROFILE_RECIPES_SUCCESS,
        recipes: data
    };
};

export const otherProfileRecipesFail = (error) => {
    return {
        type: actionTypes.OTHER_PROFILE_RECIPES_FAIL,
        loading: false,
        error: error
    };
};
