import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    recipes: null,
    error: null,
    loading: false,
    loaded: false,
};

const homeRecipesStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const homeRecipesSuccess = (state, action) => {
    return updateObject( state, {
        recipes: action.recipes,
        error: null,
        loading: false,
        loaded: true,
     } );
};

const homeRecipesFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: action.false
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.HOME_RECIPES_START: return homeRecipesStart(state, action);
        case actionTypes.HOME_RECIPES_SUCCESS: return homeRecipesSuccess(state, action);
        case actionTypes.HOME_RECIPES_FAIL: return homeRecipesFail(state, action);
        default:
            return state;
    }
};

export default reducer;
