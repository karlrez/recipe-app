import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    recipes: null,
    error: null,
    loading: false
};

const recipeInfoStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const recipeInfoSuccess = (state, action) => {
    return updateObject( state, {
        recipes: action.recipes,
        error: null,
        loading: false
     } );
};

const recipeInfoFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: action.false
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.RECIPE_INFO_START: return recipeInfoStart(state, action);
        case actionTypes.RECIPE_INFO_SUCCESS: return recipeInfoSuccess(state, action);
        case actionTypes.RECIPE_INFO_FAIL: return recipeInfoFail(state, action);
        default:
            return state;
    }
};

export default reducer;
