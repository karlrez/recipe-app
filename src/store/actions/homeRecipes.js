import axios from '../../axios';
import * as actionTypes from './actionTypes';


export const homeRecipes = (token, url) => {
    return dispatch => {
        dispatch(homeRecipesStart());

        const header = {
            headers: { Authorization: 'Token ' + token }
        }
        console.log(url + "\n" + token);
        axios.get(url, header)
            .then(response => {
                console.log("homeRecipes: \n" + JSON.stringify(response.data));
                dispatch(homeRecipesSuccess(response.data));
            })
            .catch(err => {
                //console.log(err.response); //more detailed error info
                //console.log(err.response.request.responseText);
                console.log(err.response);
                dispatch(homeRecipesFail(err.response));
            });
    };
};

export const homeRecipesStart = () => {
    return {
        type: actionTypes.HOME_RECIPES_START
    };
};

export const homeRecipesSuccess = (data) => {
    return {
        type: actionTypes.HOME_RECIPES_SUCCESS,
        recipes: data
    };
};

export const homeRecipesFail = (error) => {
    return {
        type: actionTypes.HOME_RECIPES_FAIL,
        loading: false,
        error: error
    };
};
