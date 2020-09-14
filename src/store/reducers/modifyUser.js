import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    error: null,
    loading: false,
    showSuccess: false,
};

const modifyUserStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const modifyUserSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
        showSuccess: true,
     } );
};

const modifyUserFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.MODIFY_USER_START: return modifyUserStart(state, action);
        case actionTypes.MODIFY_USER_SUCCESS: return modifyUserSuccess(state, action);
        case actionTypes.MODIFY_USER_FAIL: return modifyUserFail(state, action);
        default:
            return state;
    }
};

export default reducer;
