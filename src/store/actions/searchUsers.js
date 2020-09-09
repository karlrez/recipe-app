import axios from '../../axios';
import * as actionTypes from './actionTypes';


export const searchUsers = (url) => {
    return dispatch => {
        dispatch(searchUsersStart());
        console.log(url);
        axios.get(url)
            .then(response => {
                console.log("searchUsers: \n" + JSON.stringify(response.data));
                dispatch(searchUsersSuccess(response.data));
            })
            .catch(err => {
                //console.log(err.response); //more detailed error info
                //console.log(err.response.request.responseText);
                console.log(err.response);
                dispatch(searchUsersFail(err.response));
            });
    };
};

export const searchUsersStart = () => {
    return {
        type: actionTypes.USER_SEARCH_START
    };
};

export const searchUsersSuccess = (data) => {
    return {
        type: actionTypes.USER_SEARCH_SUCCESS,
        users: data
    };
};

export const searchUsersFail = (error) => {
    return {
        type: actionTypes.USER_SEARCH_FAIL,
        loading: false,
        error: error
    };
};
