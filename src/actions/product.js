import * as api from "../api/index";
import * as types from "./types";

export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProducts();
    dispatch({
      type: types.FETCH_PRODUCTS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    const { data } = await api.createProduct(product);
    dispatch({
      type: types.CREATE_PRODUCT,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleProduct = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchSingleProduct(id);
    dispatch({
      type: types.FETCH_SINGLE_PRODUCT,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};


export const updateProduct = (id, product) => async (dispatch) => {
  try {
    const { data } = await api.updateProduct(id, product);
    dispatch({ type: types.UPDATE_PRODUCT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteProduct(id);
    dispatch({
      type: types.DELETE_PRODUCT,
      payload: data._id,
    });
  } catch (error) {
    console.log(error);
  }
};