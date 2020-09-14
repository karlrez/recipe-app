import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

// Imports needed for Redux
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import navbarReducer from './store/reducers/navbar';
import authReducer from './store/reducers/auth';
import profileInfoReducer from './store/reducers/profileInfo';
import profileRecipesReducer from './store/reducers/profileRecipes';
import homeRecipeReducer from './store/reducers/homeRecipes';
import popularRecipeReducer from './store/reducers/popularRecipes';
import searchRecipeReducer from './store/reducers/searchRecipes';
import searchUsersReducer from './store/reducers/searchUsers';
import createUserReducer from './store/reducers/createUser';
import createRecipeReducer from './store/reducers/createRecipe';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  navbar: navbarReducer,
  auth: authReducer,
  profileInfo: profileInfoReducer,
  profileRecipes: profileRecipesReducer,
  homeRecipes: homeRecipeReducer,
  popularRecipes: popularRecipeReducer,
  searchRecipes: searchRecipeReducer,
  searchUsers: searchUsersReducer,
  createUser: createUserReducer,
  createRecipe: createRecipeReducer,
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
