import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

/**
 * For getting profile info on other users
 */

const initialState = {
    id: null,
    username: null,
    full_name: null,
    title: null,
    bio: null,
    followers: null,
    following: null,
    date_joined: null,
    profile_pic: null,
    error: false,
    loading: false,
    loaded: false,
};

const otherProfileInfoStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const otherProfileInfoSuccess = (state, action) => {
    return updateObject( state, {
        id: action.id,
        username: action.username,
        full_name: action.full_name,
        title: action.title,
        bio: action.bio,
        followers: action.followers,
        following: action.following,
        date_joined: action.date_joined,
        profile_pic: action.profile_pic,
        error: false,
        loading: false,
        loaded: true,
     } );
};

const otherProfileInfoFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.OTHER_PROFILE_INFO_START: return otherProfileInfoStart(state, action);
        case actionTypes.OTHER_PROFILE_INFO_SUCCESS: return otherProfileInfoSuccess(state, action);
        case actionTypes.OTHER_PROFILE_INFO_FAIL: return otherProfileInfoFail(state, action);
        default:
            return state;
    }
};

export default reducer;
