import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    error: null,
    loading: false,
    redirectPath: null,
};

const createUserStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const createUserSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
        redirectPath: '/login',
     } );
};

const createUserFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CREATE_USER_START: return createUserStart(state, action);
        case actionTypes.CREATE_USER_SUCCESS: return createUserSuccess(state, action);
        case actionTypes.CREATE_USER_FAIL: return createUserFail(state, action);
        default:
            return state;
    }
};

export default reducer;
