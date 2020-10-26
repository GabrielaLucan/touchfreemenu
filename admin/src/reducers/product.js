import {
  CREATE_PRODUCT_PENDING,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  GET_PRODUCTS_PENDING,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  MOVE_PRODUCT_PENDING,
  MOVE_PRODUCT_SUCCESS,
  MOVE_PRODUCT_ERROR,
  EDIT_PRODUCT_PENDING,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  REMOVE_PRODUCT_PENDING,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_ERROR,
} from '../actions/product';

const initialState = {
  list: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // ---PENDINGS---
    case CREATE_PRODUCT_PENDING:
    case EDIT_PRODUCT_PENDING:
    case GET_PRODUCTS_PENDING:
    case REMOVE_PRODUCT_PENDING:
      return { ...state, loading: true };
    case MOVE_PRODUCT_PENDING:
      const list = [...state.list];
      const { productId, destinationIndex } = action;

      const draggedItem = list.find((x) => x.id === productId);
      const listWithoutItem = list.filter((x) => x.id !== productId);

      const newList = [...listWithoutItem.slice(0, destinationIndex - 1), draggedItem, ...listWithoutItem.slice(destinationIndex - 1)];

      newList.forEach((x, i) => {
        x.index = i + 1;
      });

      return { ...state, list: newList };

    // ---SUCCESSES---
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.createdProduct],
        loading: false,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        list: action.products,
        loading: false,
      };
    case MOVE_PRODUCT_SUCCESS:
      return {
        ...state,
        list: action.newProducts,
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        list: [...state.list.filter((x) => x.id != action.updatedProduct.id), action.updatedProduct],
        loading: false,
      };
    case REMOVE_PRODUCT_SUCCESS:
      return {
        ...state,
        list: [...state.list.filter((x) => x.id != action.productId)],
        loading: false,
      };

    // ---ERRORS---
    case CREATE_PRODUCT_ERROR:
    case GET_PRODUCTS_ERROR:
    case MOVE_PRODUCT_ERROR:
    case EDIT_PRODUCT_ERROR:
    case REMOVE_PRODUCT_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};
