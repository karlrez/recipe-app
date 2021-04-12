import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    recipes: [],
    error: null,
    loading: false,
    loaded: false,
};

const searchRecipesStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const searchRecipesSuccess = (state, action) => {
    return updateObject( state, {
        recipes: action.recipes,
        error: null,
        loading: false,
        loaded: true,
     } );
};

const searchRecipesFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: action.false,
        recipes: [],
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SEARCH_RECIPES_START: return searchRecipesStart(state, action);
        case actionTypes.SEARCH_RECIPES_SUCCESS: return searchRecipesSuccess(state, action);
        case actionTypes.SEARCH_RECIPES_FAIL: return searchRecipesFail(state, action);
        default:
            return state;
    }
};

export default reducer;
