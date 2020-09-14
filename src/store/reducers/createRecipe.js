import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    error: null,
    loading: false,
    showSuccess: false,
};

const createRecipeStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const createRecipeSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
        showSuccess: true,
     } );
};

const createRecipeFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
};

const addAnotherRecipe = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        showSuccess: false,
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CREATE_RECIPE_START: return createRecipeStart(state, action);
        case actionTypes.CREATE_RECIPE_SUCCESS: return createRecipeSuccess(state, action);
        case actionTypes.CREATE_RECIPE_FAIL: return createRecipeFail(state, action);
        case actionTypes.ADD_ANOTHER_RECIPE: return addAnotherRecipe(state, action);
        default:
            return state;
    }
};

export default reducer;
