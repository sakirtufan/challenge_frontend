import * as types from "../actions/types";

const initialState = {
  products: [],
  currentProduct: null
};


const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case types.CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case types.FETCH_SINGLE_PRODUCT:
      return {
        ...state,
        currentProduct: action.payload,
      };
    case types.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) => {
          if (product._id === action.payload._id) {
            return action.payload;
          } else {
            return product;
          }
        }),
        currentProduct: action.payload,
      };
    case types.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product._id !== action.payload),
        currentProduct: null,
      };

    default:
      return {
        ...state,
      };
  }
};

export default productReducer;