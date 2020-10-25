import { categoryEndpoints } from '../util/api';

// #create
export const CREATE_CATEGORY_PENDING = 'CREATE_CATEGORY_PENDING';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_ERROR = 'CREATE_CATEGORY_ERROR';

export const createCategory = (category) => async (dispatch) => {
  dispatch({ type: CREATE_CATEGORY_PENDING });

  try {
    const createdCategory = await categoryEndpoints.create(category);

    dispatch({ type: CREATE_CATEGORY_SUCCESS, createdCategory });
  } catch (error) {
    dispatch({ type: CREATE_CATEGORY_ERROR, error });
  }
};

// #get
export const GET_CATEGORIES_PENDING = 'GET_CATEGORIES_PENDING';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_ERROR = 'GET_CATEGORIES_ERROR';

export const getCategories = (category) => async (dispatch) => {
  dispatch({ type: GET_CATEGORIES_PENDING });

  try {
    const categories = await categoryEndpoints.get(category);

    dispatch({ type: GET_CATEGORIES_SUCCESS, categories });
  } catch (error) {
    dispatch({ type: GET_CATEGORIES_ERROR, error });
  }
};
