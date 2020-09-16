import { uploadPdfMenu } from '../util/api';

// #uploadPdfMenu
export const UPLOAD_PDF_PENDING = 'UPLOAD_PDF_PENDING';
export const UPLOAD_PDF_SUCCESS = 'UPLOAD_PDF_SUCCESS';
export const UPLOAD_PDF_ERROR = 'UPLOAD_PDF_ERROR';

export const uploadPdf = (data) => async (dispatch) => {
  dispatch({ type: UPLOAD_PDF_PENDING });

  try {
    const { pdfUrl } = await uploadPdfMenu(data);

    dispatch({ type: UPLOAD_PDF_SUCCESS, pdfUrl });
  } catch (error) {
    dispatch({ type: UPLOAD_PDF_ERROR, error });
  }
};
