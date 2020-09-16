import jwtDecode from 'jwt-decode';
import { UPLOAD_PDF_PENDING, UPLOAD_PDF_SUCCESS, UPLOAD_PDF_ERROR } from '../actions/menu';

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

    //succeses
    case UPLOAD_PDF_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.token,
        user: { ...user, pdfUrl: action.pdfUrl },
      };

    //errors
    case UPLOAD_PDF_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};
