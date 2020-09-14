import axios from '../../axios';
import * as actionTypes from './actionTypes';


export const profileInfo = (token) => {
    return dispatch => {
        dispatch(profileInfoStart());

        const header = {
            headers: { Authorization: 'Token ' + token }
        }

        axios.get('/user/manage/profile', header)
            .then(response => {
                console.log("profileInfo: \n" + JSON.stringify(response.data));
                dispatch(profileInfoSuccess(response.data));
            })
            .catch(err => {
                //console.log(err.response); //more detailed error info
                //console.log(err.response.request.responseText);
                dispatch(profileInfoFail(err.response.request.responseText));
            });
    };
};

export const profileInfoStart = () => {
    return {
        type: actionTypes.PROFILE_INFO_START
    };
};

export const profileInfoSuccess = (data) => {
    return {
        type: actionTypes.PROFILE_INFO_SUCCESS,
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

export const profileInfoFail = (error) => {
    return {
        type: actionTypes.PROFILE_INFO_FAIL,
        error: error
    };
};
