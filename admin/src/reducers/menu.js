import jwtDecode from 'jwt-decode';
import { UPLOAD_PDF_PENDING, UPLOAD_PDF_SUCCESS, UPLOAD_PDF_ERROR, TOGGLE_QUESTIONNAIRE_PENDING, TOGGLE_QUESTIONNAIRE_SUCCESS, TOGGLE_QUESTIONNAIRE_ERROR } from '../actions/menu';

const token = localStorage.getItem('token');
const user = token && jwtDecode(token).user;

const initialState = {
  ...(token && { token }),
  ...(user && { user }),
};

export default (state = initialState, action) => {
  switch (action.type) {
    //pendings
    case UPLOAD_PDF_PENDING:
      return { ...state, loading: true };
    case TOGGLE_QUESTIONNAIRE_PENDING:
      return { ...state, loading: true };

    //succeses
    case UPLOAD_PDF_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case TOGGLE_QUESTIONNAIRE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    //errors
    case UPLOAD_PDF_ERROR:
      return { ...state, loading: false };
    case TOGGLE_QUESTIONNAIRE_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};
