import axios from '../../axios';
import * as actionTypes from './actionTypes';


export const otherProfileInfo = (username) => {
    return dispatch => {
        dispatch(otherProfileInfoStart());

        axios.get('/user/search-user/' + username + '/')
            .then(response => {
                dispatch(otherProfileInfoSuccess(response.data));
            })
            .catch(err => {
                dispatch(otherProfileInfoFail(err));
                console.log(err.response.request.responseText);
            });
    };
};

export const otherProfileInfoStart = () => {
    return {
        type: actionTypes.OTHER_PROFILE_INFO_START
    };
};

export const otherProfileInfoSuccess = (data) => {
    return {
        type: actionTypes.OTHER_PROFILE_INFO_SUCCESS,
        id: data.id,
        username: data.username,
        full_name: data.full_name,
        title: data.title,
        bio: data.bio,
        followers: data.followers,
        following: data.following,
        date_joined: data.date_joined,
        profile_pic: data.profile_pic
    };
};

export const otherProfileInfoFail = (error) => {
    return {
        type: actionTypes.OTHER_PROFILE_INFO_FAIL,
        error: error
    };
};
