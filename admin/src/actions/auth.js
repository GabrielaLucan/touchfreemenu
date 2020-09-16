import { login } from '../util/api';

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

// #logout
export const LOGOUT = 'LOGOUT';
export const logout = () => ({ type: LOGOUT });
