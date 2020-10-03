import axios from '../../axios';
import * as actionTypes from './actionTypes';

// Pass in a username and 'true' to get followers or 'false' to get following
export const getFollowers = (user, getFollowers) => {
    return dispatch => {
        dispatch(getFollowersStart());

        let url;
        if (getFollowers) {
            url = 'user/' + user + '/followers';
        } else {
            url = 'user/' + user + '/following';
        }

        axios.get(url)
            .then(response => {
                console.log("getFollowers: \n" + JSON.stringify(response.data));
                dispatch(getFollowersSuccess(response.data));
            })
            .catch(err => {
                //console.log(err.response); //more detailed error info
                console.log(err.response.request.responseText);
                dispatch(getFollowersFail(err));
            });
    };
};

export const getFollowersStart = () => {
    return {
        type: actionTypes.GET_FOLLOWERS_START
    };
};

export const getFollowersSuccess = (data) => {
    return {
        type: actionTypes.GET_FOLLOWERS_SUCCESS,
        followers: data,
    };
};

export const getFollowersFail = (error) => {
    return {
        type: actionTypes.GET_FOLLOWERS_FAIL,
        error: error
    };
};
