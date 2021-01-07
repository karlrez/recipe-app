import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    error: null,
    loading: false,
};

const likeRecipeStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const likeRecipeSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
     } );
};

const likeRecipeFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LIKE_RECIPE_START: return likeRecipeStart(state, action);
        case actionTypes.LIKE_RECIPE_SUCCESS: return likeRecipeSuccess(state, action);
        case actionTypes.LIKE_RECIPE_FAIL: return likeRecipeFail(state, action);
        default:
            return state;
    }
};

export default reducer;
