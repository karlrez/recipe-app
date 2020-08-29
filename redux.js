/**
This class holds what is needed to use Redux: Store, Reducer,
Dispatching Action, Subscription
*/
const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
  selectedPage: 1
}

//Reducer
const rootReducer = (state = initialState, action) => {
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

//Store
const store = createStore(rootReducer);
console.log("store:" + store.getState());

//Dispatching Action
store.dispatch({type: 'HOME_PAGE', value: 1);
store.dispatch({type: 'SEARCH_PAGE', value: 2);
store.dispatch({type: 'ADD_PAGE', value: 3);
store.dispatch({type: 'POPULAR_PAGE', value: 4);
store.dispatch({type: 'PROFILE_PAGE', value: 5);

//Subscription
store.subscribe(() => {
  console.log('[Subscription]', store.getState());
});
