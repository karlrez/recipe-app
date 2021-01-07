import axios from '../../axios';
import * as actionTypes from './actionTypes';


export const createUser = (data) => {
    return dispatch => {
        dispatch(createUserStart());
        const url = 'user/create';
        const header = {
            headers: {
                'content-type': 'multipart/form-data' }
        }
        axios.post(url, data, header)
            .then(response => {
                console.log("createUser: \n" + JSON.stringify(response.data));
                dispatch(createUserSuccess(response.data));
            })
            .catch(err => {
                console.log(err.response);
                dispatch(createUserFail(JSON.stringify(err.response.data)));
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
