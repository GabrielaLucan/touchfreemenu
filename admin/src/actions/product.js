import { productEndpoints } from '../util/api';

// #create
export const CREATE_PRODUCT_PENDING = 'CREATE_PRODUCT_PENDING';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_ERROR = 'CREATE_PRODUCT_ERROR';

export const createProduct = (product) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_PENDING });

  const productData = new FormData();

  Object.keys(product).forEach((key) => {
    productData.append(key, product[key] == null ? '' : product[key]);
  });

  try {
    const createdProduct = await productEndpoints.create(productData);

    dispatch({ type: CREATE_PRODUCT_SUCCESS, createdProduct });
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_ERROR, error });
  }
};

// #get
export const GET_PRODUCTS_PENDING = 'GET_PRODUCTS_PENDING';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';

export const getProducts = (product) => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_PENDING });

  try {
    const products = await productEndpoints.get(product);

    dispatch({ type: GET_PRODUCTS_SUCCESS, products });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_ERROR, error });
  }
};

// #edit
export const EDIT_PRODUCT_PENDING = 'EDIT_PRODUCT_PENDING';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_ERROR = 'EDIT_PRODUCT_ERROR';

export const editProduct = (product) => async (dispatch) => {
  dispatch({ type: EDIT_PRODUCT_PENDING });

  const productData = new FormData();

  Object.keys(product).forEach((key) => {
    productData.append(key, product[key] == null ? '' : product[key]);
  });

  try {
    const updatedProduct = await productEndpoints.edit(productData);

    dispatch({ type: EDIT_PRODUCT_SUCCESS, updatedProduct });
  } catch (error) {
    dispatch({ type: EDIT_PRODUCT_ERROR, error });
  }
};

// #remove
export const REMOVE_PRODUCT_PENDING = 'REMOVE_PRODUCT_PENDING';
export const REMOVE_PRODUCT_SUCCESS = 'REMOVE_PRODUCT_SUCCESS';
export const REMOVE_PRODUCT_ERROR = 'REMOVE_PRODUCT_ERROR';

export const removeProduct = (productId) => async (dispatch) => {
  dispatch({ type: REMOVE_PRODUCT_PENDING });

  try {
    await productEndpoints.remove(productId);

    dispatch({ type: REMOVE_PRODUCT_SUCCESS, productId });
  } catch (error) {
    dispatch({ type: REMOVE_PRODUCT_ERROR, error });
  }
};

// #reoder
export const MOVE_PRODUCT_PENDING = 'MOVE_PRODUCT_PENDING';
export const MOVE_PRODUCT_SUCCESS = 'MOVE_PRODUCT_SUCCESS';
export const MOVE_PRODUCT_ERROR = 'MOVE_PRODUCT_ERROR';

export const moveProduct = (productId, destinationIndex) => async (dispatch) => {
  dispatch({ type: MOVE_PRODUCT_PENDING, productId, destinationIndex });

  try {
    const newProducts = await productEndpoints.move(productId, destinationIndex);

    dispatch({ type: MOVE_PRODUCT_SUCCESS, newProducts });
  } catch (error) {
    dispatch({ type: MOVE_PRODUCT_ERROR, error });
  }
};
