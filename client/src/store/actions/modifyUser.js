import axios from '../../axios';
import * as actionTypes from './actionTypes';


export const modifyUser = (data, token) => {
    return dispatch => {
        dispatch(modifyUserStart());
        const url = '/user/' + data.username + '/update-profile';
        const header = {
            headers: {
                Authorization: 'Token ' + token,
                'content-type': 'multipart/form-data' }
        }
        axios.put(url, data, header)
            .then(response => {
                dispatch(modifyUserSuccess(response.data));
            })
            .catch(err => {
                console.log(err.response);
                dispatch(modifyUserFail(JSON.stringify(err.response.data)));
            });
    };
};

export const modifyUserStart = () => {
    return {
        type: actionTypes.MODIFY_USER_START
    };
};

export const modifyUserSuccess = (data) => {
    return {
        type: actionTypes.MODIFY_USER_SUCCESS,
        recipes: data
    };
};

export const modifyUserFail = (error) => {
    return {
        type: actionTypes.MODIFY_USER_FAIL,
        loading: false,
        error: error
    };
};