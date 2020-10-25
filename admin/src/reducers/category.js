import {
  CREATE_CATEGORY_PENDING,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_ERROR,
  GET_CATEGORIES_PENDING,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
  MOVE_CATEGORY_PENDING,
  MOVE_CATEGORY_SUCCESS,
  MOVE_CATEGORY_ERROR,
  EDIT_CATEGORY_PENDING,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_ERROR,
} from '../actions/category';

const initialState = {
  list: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    //pendings
    case CREATE_CATEGORY_PENDING:
    case EDIT_CATEGORY_PENDING:
    case GET_CATEGORIES_PENDING:
      return { ...state, loading: true };
    case MOVE_CATEGORY_PENDING:
      const list = [...state.list];
      const { categoryId, destinationIndex } = action;

      const draggedItem = list.find((x) => x.id === categoryId);
      const listWithoutItem = list.filter((x) => x.id !== categoryId);

      const newList = [...listWithoutItem.slice(0, destinationIndex - 1), draggedItem, ...listWithoutItem.slice(destinationIndex - 1)];

      newList.forEach((x, i) => {
        x.index = i + 1;
      });

      return { ...state, list: newList };

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
    case MOVE_CATEGORY_SUCCESS:
      return {
        ...state,
        list: action.newCategories,
      };
    case EDIT_CATEGORY_SUCCESS:
      return {
        ...state,
        list: [...state.list.filter((x) => x.id != action.updatedCategory.id), action.updatedCategory],
        loading: false,
      };

    //errors
    case CREATE_CATEGORY_ERROR:
    case GET_CATEGORIES_ERROR:
    case MOVE_CATEGORY_ERROR:
    case EDIT_CATEGORY_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};
