import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    recipes: null,
    error: false,
    loading: false,
    loaded: false,
};

const otherProfileRecipesStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const otherProfileRecipesSuccess = (state, action) => {
    return updateObject( state, {
        recipes: action.recipes,
        error: false,
        loading: false,
        loaded: true,
     } );
};

const otherProfileRecipesFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: action.false
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.OTHER_PROFILE_RECIPES_START: return otherProfileRecipesStart(state, action);
        case actionTypes.OTHER_PROFILE_RECIPES_SUCCESS: return otherProfileRecipesSuccess(state, action);
        case actionTypes.OTHER_PROFILE_RECIPES_FAIL: return otherProfileRecipesFail(state, action);
        default:
            return state;
    }
};

export default reducer;
