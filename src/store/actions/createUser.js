import axios from '../../axios';
import * as actionTypes from './actionTypes';


export const createUser = (url, data) => {
    return dispatch => {
        dispatch(createUserStart());
        console.log(url);
        axios.post(url, data)
            .then(response => {
                console.log("createUser: \n" + JSON.stringify(response.data));
                dispatch(createUserSuccess(response.data));
            })
            .catch(err => {
                //console.log(err.response); //more detailed error info
                //console.log(err.response.request.responseText);
                console.log(err.response);
                dispatch(createUserFail(err.response.responseText));
            });
    };
};

export const createUserStart = () => {
    return {
        type: actionTypes.CREATE_USER_START
    };
};

export const createUserSuccess = (data) => {
    return {
        type: actionTypes.CREATE_USER_SUCCESS,
        recipes: data
    };
};

export const createUserFail = (error) => {
    return {
        type: actionTypes.CREATE_USER_FAIL,
        loading: false,
        error: error
    };
};
