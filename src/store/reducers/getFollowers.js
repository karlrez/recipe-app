import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    followers: null,
    error: null,
    loading: false,
};

const getFollowersStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true, followers: null } );
};

const getFollowersSuccess = (state, action) => {
    return updateObject( state, {
        followers: action.followers,
        error: null,
        loading: false,
     } );
};

const getFollowersFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_FOLLOWERS_START: return getFollowersStart(state, action);
        case actionTypes.GET_FOLLOWERS_SUCCESS: return getFollowersSuccess(state, action);
        case actionTypes.GET_FOLLOWERS_FAIL: return getFollowersFail(state, action);
        default:
            return state;
    }
};

export default reducer;
