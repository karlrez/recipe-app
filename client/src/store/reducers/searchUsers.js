import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    users: [],
    error: null,
    loading: false,
    loaded: false,
};

const searchUsersStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const searchUsersSuccess = (state, action) => {
    return updateObject( state, {
        users: action.users,
        error: null,
        loading: false,
        loaded: true,
     } );
};

const searchUsersFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: action.false,
        users: [],
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.USER_SEARCH_START: return searchUsersStart(state, action);
        case actionTypes.USER_SEARCH_SUCCESS: return searchUsersSuccess(state, action);
        case actionTypes.USER_SEARCH_FAIL: return searchUsersFail(state, action);
        default:
            return state;
    }
};

export default reducer;
