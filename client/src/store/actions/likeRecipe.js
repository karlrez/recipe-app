import axios from '../../axios';
import * as actionTypes from './actionTypes';


export const likeRecipe = (token, recipeId) => {
    return dispatch => {
        dispatch(likeRecipeStart());
        const url = `/recipes/like/${recipeId}`;
        const header = {
            headers: {
                Authorization: 'Token ' + token, }
        }
        axios.get(url, header)
            .then(response => {
                dispatch(likeRecipeSuccess(response.data));
            })
            .catch(err => {
                console.log(err.response);
                dispatch(likeRecipeFail(JSON.stringify(err.response.data)));
            });
    };
};

export const likeRecipeStart = () => {
    return {
        type: actionTypes.LIKE_RECIPE_START
    };
};

export const likeRecipeSuccess = (data) => {
    return {
        type: actionTypes.LIKE_RECIPE_SUCCESS,
        recipes: data
    };
};

export const likeRecipeFail = (error) => {
    return {
        type: actionTypes.LIKE_RECIPE_FAIL,
        loading: false,
        error: error
    };
};