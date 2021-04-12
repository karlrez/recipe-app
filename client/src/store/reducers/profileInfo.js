import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


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
    error: null,
    loading: false,
    loaded: false,
};

const profileInfoStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const profileInfoSuccess = (state, action) => {
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
        error: null,
        loading: false,
        loaded: true,
     } );
};

const profileInfoFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.PROFILE_INFO_START: return profileInfoStart(state, action);
        case actionTypes.PROFILE_INFO_SUCCESS: return profileInfoSuccess(state, action);
        case actionTypes.PROFILE_INFO_FAIL: return profileInfoFail(state, action);
        default:
            return state;
    }
};

export default reducer;
