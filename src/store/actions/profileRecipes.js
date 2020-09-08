import axios from '../../axios';
import * as actionTypes from './actionTypes';


export const profileRecipes = (token, url) => {
    return dispatch => {
        dispatch(profileRecipesStart());

        const header = {
            headers: { Authorization: 'Token ' + token }
        }
        console.log(url + "\n" + token);
        axios.get(url, header)
            .then(response => {
                console.log("profileRecipes: \n" + JSON.stringify(response.data));
                dispatch(profileRecipesSuccess(response.data));
            })
            .catch(err => {
                //console.log(err.response); //more detailed error info
                //console.log(err.response.request.responseText);
                console.log(err.response);
                dispatch(profileRecipesFail(err.response));
            });
    };
};

export const profileRecipesStart = () => {
    return {
        type: actionTypes.PROFILE_RECIPES_START
    };
};

export const profileRecipesSuccess = (data) => {
    return {
        type: actionTypes.PROFILE_RECIPES_SUCCESS,
        recipes: data
    };
};

export const profileRecipesFail = (error) => {
    return {
        type: actionTypes.PROFILE_RECIPES_FAIL,
        loading: false,
        error: error
    };
};
