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

// #edit
export const EDIT_CATEGORY_PENDING = 'EDIT_CATEGORY_PENDING';
export const EDIT_CATEGORY_SUCCESS = 'EDIT_CATEGORY_SUCCESS';
export const EDIT_CATEGORY_ERROR = 'EDIT_CATEGORY_ERROR';

export const editCategory = (category) => async (dispatch) => {
  dispatch({ type: EDIT_CATEGORY_PENDING });

  try {
    const updatedCategory = await categoryEndpoints.edit(category);

    dispatch({ type: EDIT_CATEGORY_SUCCESS, updatedCategory });
  } catch (error) {
    dispatch({ type: EDIT_CATEGORY_ERROR, error });
  }
};

// #remove
export const REMOVE_CATEGORY_PENDING = 'REMOVE_CATEGORY_PENDING';
export const REMOVE_CATEGORY_SUCCESS = 'REMOVE_CATEGORY_SUCCESS';
export const REMOVE_CATEGORY_ERROR = 'REMOVE_CATEGORY_ERROR';

export const removeCategory = (categoryId) => async (dispatch) => {
  dispatch({ type: REMOVE_CATEGORY_PENDING });

  try {
    await categoryEndpoints.remove(categoryId);

    dispatch({ type: REMOVE_CATEGORY_SUCCESS, categoryId });
  } catch (error) {
    dispatch({ type: REMOVE_CATEGORY_ERROR, error });
  }
};

// #reoder
export const MOVE_CATEGORY_PENDING = 'MOVE_CATEGORY_PENDING';
export const MOVE_CATEGORY_SUCCESS = 'MOVE_CATEGORY_SUCCESS';
export const MOVE_CATEGORY_ERROR = 'MOVE_CATEGORY_ERROR';

export const moveCategory = (categoryId, destinationIndex) => async (dispatch) => {
  dispatch({ type: MOVE_CATEGORY_PENDING, categoryId, destinationIndex });

  try {
    const newCategories = await categoryEndpoints.move(categoryId, destinationIndex);

    dispatch({ type: MOVE_CATEGORY_SUCCESS, newCategories });
  } catch (error) {
    dispatch({ type: MOVE_CATEGORY_ERROR, error });
  }
};
