import { CREATE_CATEGORY_PENDING, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_ERROR, GET_CATEGORIES_PENDING, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_ERROR } from '../actions/category';

const initialState = {
  list: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    //pendings
    case CREATE_CATEGORY_PENDING:
      return { ...state, loading: true };
    case GET_CATEGORIES_PENDING:
      return { ...state, loading: true };

    //succeses
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.createdCategory],
        loading: false,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        list: action.categories,
        loading: false,
      };

    //errors
    case CREATE_CATEGORY_ERROR:
      return { ...state, loading: false };
    case GET_CATEGORIES_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};
