import { login, getLoggedUser } from '../util/api';

// #login
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const attemptLogin = (username, password) => async (dispatch) => {
  dispatch({ type: LOGIN_PENDING });
  try {
    const token = await login(username, password);
    dispatch({ type: LOGIN_SUCCESS, token });
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, error });
  }
};

// #get current user
export const GET_CURRENT_USER_PENDING = 'GET_CURRENT_USER_PENDING';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_ERROR = 'GET_CURRENT_USER_ERROR';

export const getCurrentUser = (token) => async (dispatch) => {
  dispatch({ type: GET_CURRENT_USER_PENDING });
  try {
    const user = await getLoggedUser(token);
    dispatch({ type: GET_CURRENT_USER_SUCCESS, user });
  } catch (error) {
    dispatch({ type: GET_CURRENT_USER_ERROR, error });
  }
};

// #logout
export const LOGOUT = 'LOGOUT';
export const logout = () => ({ type: LOGOUT });
