import { changePassword, login } from '../util/api';

// #login
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

// #change password
export const PASSWORD_CHANGE_PENDING = 'PASSWORD_CHANGE_PENDING';
export const PASSWORD_CHANGE_SUCCESS = 'PASSWORD_CHANGE_SUCCESS';
export const PASSWORD_CHANGE_ERROR = 'PASSWORD_CHANGE_ERROR';

export const attemptLogin = (username, password) => async (dispatch) => {
  dispatch({ type: LOGIN_PENDING });

  try {
    const token = await login(username, password);

    localStorage.currentUsername = username;
    localStorage.currentPassword = password;
    dispatch({ type: LOGIN_SUCCESS, token });
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, error });
  }
};

export const attemptChangePassword = (oldPassword, newPassword) => async (dispatch) => {
  dispatch({ type: PASSWORD_CHANGE_PENDING });

  try {
    await changePassword(oldPassword, newPassword);

    localStorage.currentPassword = newPassword;
    alert('Parola a fost schimbată cu succes.');
    dispatch({ type: PASSWORD_CHANGE_SUCCESS });
  } catch (error) {
    dispatch({ type: PASSWORD_CHANGE_ERROR, error });
  }
};

// #logout
export const LOGOUT = 'LOGOUT';
export const logout = () => {
  localStorage.clear();
  return { type: LOGOUT };
};
