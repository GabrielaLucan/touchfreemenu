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
  REMOVE_CATEGORY_PENDING,
  REMOVE_CATEGORY_SUCCESS,
  REMOVE_CATEGORY_ERROR,
} from '../actions/category';

const initialState = {
  list: localStorage.categoryList ? JSON.parse(localStorage.categoryList) : [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // ---PENDINGS---
    case CREATE_CATEGORY_PENDING:
    case EDIT_CATEGORY_PENDING:
    case GET_CATEGORIES_PENDING:
    case REMOVE_CATEGORY_PENDING:
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

    // ---SUCCESSES---
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.createdCategory],
        loading: false,
      };
    case GET_CATEGORIES_SUCCESS:
      localStorage.categoryList = JSON.stringify(action.categories);

      return {
        ...state,
        list: action.categories,
        loading: false,
      };
    case MOVE_CATEGORY_SUCCESS:
      localStorage.categoryList = JSON.stringify(action.newCategories);

      return {
        ...state,
        list: action.newCategories,
      };
    case EDIT_CATEGORY_SUCCESS:
      const listWithEditedItem = [...state.list.filter((x) => x.id != action.updatedCategory.id), action.updatedCategory];
      localStorage.categoryList = JSON.stringify(newList);

      return {
        ...state,
        list: listWithEditedItem,
        loading: false,
      };
    case REMOVE_CATEGORY_SUCCESS:
      const listWithRemovedItem = [...state.list.filter((x) => x.id != action.categoryId)];
      localStorage.categoryList = listWithRemovedItem;

      return {
        ...state,
        list: listWithRemovedItem,
        loading: false,
      };

    // ---ERRORS---
    case CREATE_CATEGORY_ERROR:
    case GET_CATEGORIES_ERROR:
    case MOVE_CATEGORY_ERROR:
    case EDIT_CATEGORY_ERROR:
    case REMOVE_CATEGORY_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};
