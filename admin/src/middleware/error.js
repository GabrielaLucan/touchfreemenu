import { LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT } from '../actions/auth';
import { UPLOAD_PDF_SUCCESS, UPLOAD_PDF_ERROR } from '../actions/menu';
import { hideErrorClearTimeout, showErrorWithTimeout } from '../actions/error';

export default (store) => (next) => (action) => {
  next(action);
  switch (action.type) {
    case LOGIN_SUCCESS:
    case LOGOUT:
      if (store.getState().error) store.dispatch(hideErrorClearTimeout());
      break;

    case LOGIN_ERROR:
      store.dispatch(showErrorWithTimeout(action.error));
      break;

    default:
      break;
  }
};
