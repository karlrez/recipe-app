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
import recipeInfoReducer from './store/reducers/recipeInfo';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  navbar: navbarReducer,
  auth: authReducer,
  profileInfo: profileInfoReducer,
  recipeInfo: recipeInfoReducer
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
