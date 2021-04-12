import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    recipes: null,
    error: null,
    loading: false,
    loaded: false,
};

const profileRecipesStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const profileRecipesSuccess = (state, action) => {
    return updateObject( state, {
        recipes: action.recipes,
        error: null,
        loading: false,
        loaded: true,
     } );
};

const profileRecipesFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: action.false
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.PROFILE_RECIPES_START: return profileRecipesStart(state, action);
        case actionTypes.PROFILE_RECIPES_SUCCESS: return profileRecipesSuccess(state, action);
        case actionTypes.PROFILE_RECIPES_FAIL: return profileRecipesFail(state, action);
        default:
            return state;
    }
};

export default reducer;
