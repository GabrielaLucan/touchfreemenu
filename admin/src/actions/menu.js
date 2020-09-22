import { uploadPdfMenu } from '../util/api';
import { attemptLogin } from './auth';

// #uploadPdfMenu
export const UPLOAD_PDF_PENDING = 'UPLOAD_PDF_PENDING';
export const UPLOAD_PDF_SUCCESS = 'UPLOAD_PDF_SUCCESS';
export const UPLOAD_PDF_ERROR = 'UPLOAD_PDF_ERROR';

export const uploadPdf = (data) => async (dispatch) => {
  dispatch({ type: UPLOAD_PDF_PENDING });

  try {
    const { pdfUrl } = await uploadPdfMenu(data);

    attemptLogin(localStorage.currentUsername, localStorage.currentPassword)(dispatch);
    setTimeout(() => {
      alert('Noul meniu a fost încărcat cu succes!');
    }, 500);
    dispatch({ type: UPLOAD_PDF_SUCCESS, pdfUrl });
  } catch (error) {
    dispatch({ type: UPLOAD_PDF_ERROR, error });
  }
};
