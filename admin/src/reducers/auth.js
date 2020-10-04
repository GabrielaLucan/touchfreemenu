import jwtDecode from 'jwt-decode';
import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, PASSWORD_CHANGE_ERROR, PASSWORD_CHANGE_PENDING, PASSWORD_CHANGE_SUCCESS } from '../actions/auth';

const token = localStorage.getItem('token');
const user = token && jwtDecode(token).user;

const initialState = {
  ...(token && { token }),
  ...(user && { user }),
};

export default (state = initialState, action) => {
  switch (action.type) {
    //pendings
    case LOGIN_PENDING:
      return { ...state, loading: true };
    case PASSWORD_CHANGE_PENDING:
      return { ...state, loading: true };

    //succeses
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.token,
        user: jwtDecode(action.token).user,
      };
    case PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        token: null,
        user: null,
      };

    //errors
    case LOGIN_ERROR:
      return { ...state, loading: false };
    case PASSWORD_CHANGE_ERROR:
      return { ...state, loading: false };
    case LOGOUT:
      return { ...state, token: null, user: null };

    default:
      return state;
  }
};
