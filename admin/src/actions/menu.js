import { uploadPdfMenu, toggleCovidQuestionnaire } from '../util/api';
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

// #toggleCovidQuestionnair
export const TOGGLE_QUESTIONNAIRE_PENDING = 'TOGGLE_QUESTIONNAIRE_PENDING';
export const TOGGLE_QUESTIONNAIRE_SUCCESS = 'TOGGLE_QUESTIONNAIRE_SUCCESS';
export const TOGGLE_QUESTIONNAIRE_ERROR = 'TOGGLE_QUESTIONNAIRE_ERROR';

export const toggleQuestionnaire = () => async (dispatch) => {
  dispatch({ type: TOGGLE_QUESTIONNAIRE_PENDING });

  try {
    const { newValue } = await toggleCovidQuestionnaire();

    attemptLogin(localStorage.currentUsername, localStorage.currentPassword)(dispatch);
    dispatch({ type: TOGGLE_QUESTIONNAIRE_SUCCESS, newValue });
  } catch (error) {
    dispatch({ type: TOGGLE_QUESTIONNAIRE_ERROR, error });
  }
};
