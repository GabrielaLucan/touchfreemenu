import { LOGIN_ERROR, PASSWORD_CHANGE_ERROR } from '../actions/auth';
import { UPLOAD_PDF_ERROR } from '../actions/menu';
import { HIDE_ERROR } from '../actions/error';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
    case UPLOAD_PDF_ERROR:
    case PASSWORD_CHANGE_ERROR:
      return action.error;

    case HIDE_ERROR:
      return null;

    default:
      return state;
  }
};
