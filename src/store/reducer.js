import * as actionTypes from './actions';

const initialState = {
  selectedPage: 1
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HOME_PAGE:
      return {
        ...state,
        selectedPage: 1
      }
    case actionTypes.SEARCH_PAGE:
      return {
        ...state,
        selectedPage: 2
      }
    case actionTypes.ADD_PAGE:
      return {
        ...state,
        selectedPage: 3
      }
    case actionTypes.POPULAR_PAGE:
      return {
        ...state,
        selectedPage: 4
      }
    case actionTypes.PROFILE_PAGE:
      return {
        ...state,
        selectedPage: 5
      }
    default:
      return {
        ...state,
        selectedPage: 1
      }
  }
};

export default reducer;
