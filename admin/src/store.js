import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import form from './reducers/form';
import auth from './reducers/auth';
import menu from './reducers/menu';
import theme from './reducers/theme';
import error from './reducers/error';
import category from './reducers/category';
import product from './reducers/product';
import authMiddleware from './middleware/auth';
import themeMiddleware from './middleware/theme';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(combineReducers({ category, product, form, auth, theme, menu, error }), composeEnhancers(applyMiddleware(thunk, authMiddleware, themeMiddleware)));
