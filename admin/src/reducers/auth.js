import jwtDecode from 'jwt-decode';
import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR, GET_CURRENT_USER_PENDING, GET_CURRENT_USER_SUCCESS, GET_CURRENT_USER_ERROR, LOGOUT } from '../actions/auth';

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
    case GET_CURRENT_USER_PENDING:
      return { ...state, loading: true };

    //succeses
    case LOGIN_SUCCESS:
      const user = jwtDecode(action.token).user;
      return {
        ...state,
        loading: false,
        token: action.token,
        user,
      };
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
      };

    //errors
    case LOGIN_ERROR:
      return { ...state, loading: false };
    case GET_CURRENT_USER_ERROR:
      return { ...state, loading: false };
    case LOGOUT:
      return { ...state, token: null, user: null };

    default:
      return state;
  }
};
