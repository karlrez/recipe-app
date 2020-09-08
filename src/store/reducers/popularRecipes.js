import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    recipes: null,
    error: null,
    loading: false,
    loaded: false,
};

const popularRecipesStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const popularRecipesSuccess = (state, action) => {
    return updateObject( state, {
        recipes: action.recipes,
        error: null,
        loading: false,
        loaded: true,
     } );
};

const popularRecipesFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: action.false
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.POPULAR_RECIPES_START: return popularRecipesStart(state, action);
        case actionTypes.POPULAR_RECIPES_SUCCESS: return popularRecipesSuccess(state, action);
        case actionTypes.POPULAR_RECIPES_FAIL: return popularRecipesFail(state, action);
        default:
            return state;
    }
};

export default reducer;
