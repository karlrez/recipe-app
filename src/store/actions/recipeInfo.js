import axios from '../../axios';
import * as actionTypes from './actionTypes';


export const recipeInfo = (token, url) => {
    return dispatch => {
        dispatch(recipeInfoStart());

        const header = {
            headers: { Authorization: 'Token ' + token }
        }
        console.log(url + "\n" + token);
        axios.get(url, header)
            .then(response => {
                console.log("recipeInfo: \n" + JSON.stringify(response.data));
                dispatch(recipeInfoSuccess(response.data));
            })
            .catch(err => {
                //console.log(err.response); //more detailed error info
                //console.log(err.response.request.responseText);
                console.log(err.response);
                dispatch(recipeInfoFail(err.response));
            });
    };
};

export const recipeInfoStart = () => {
    return {
        type: actionTypes.RECIPE_INFO_START
    };
};

export const recipeInfoSuccess = (data) => {
    return {
        type: actionTypes.RECIPE_INFO_SUCCESS,
        recipes: data
    };
};

export const recipeInfoFail = (error) => {
    return {
        type: actionTypes.RECIPE_INFO_FAIL,
        loading: false,
        error: error
    };
};
