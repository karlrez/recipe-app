import axios from '../../axios';
import * as actionTypes from './actionTypes';


export const createRecipe = (data, token) => {
    return dispatch => {
        dispatch(createRecipeStart());
        const url = 'recipes/create-recipe/'
        const header = {
            headers: {
                Authorization: 'Token ' + token,
                'content-type': 'multipart/form-data' }
        }
        console.log(token);
        axios.post(url, data, header)
            .then(response => {
                console.log("createRecipe: \n" + JSON.stringify(response.data));
                dispatch(createRecipeSuccess(response.data));
            })
            .catch(err => {
                //console.log(err.response); //more detailed error info
                //console.log(err.response.request.responseText);
                console.log(err.response);
                dispatch(createRecipeFail(err.response.responseText));
            });
    };
};

export const createRecipeStart = () => {
    return {
        type: actionTypes.CREATE_RECIPE_START
    };
};

export const createRecipeSuccess = (data) => {
    return {
        type: actionTypes.CREATE_RECIPE_SUCCESS,
        recipes: data
    };
};

export const createRecipeFail = (error) => {
    return {
        type: actionTypes.CREATE_RECIPE_FAIL,
        loading: false,
        error: error
    };
};

export const addAnotherRecipe = () => {
    return {
        type: actionTypes.ADD_ANOTHER_RECIPE,
        loading: false,
        error: null,
        showSuccess: false,
    };
};
