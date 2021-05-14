import axios from "axios";
import { FAIL_CART, GET_CART, LOAD_CART } from "../actionTypes/cart";

export const getCart = () => async (dispatch) => {
  const config = {
    headers: { Authorization: localStorage.getItem("token") },
  };
  dispatch({ type: LOAD_CART });
  try {
    let result = await axios.get(`/api/cart`, config);
    // console.log(result);
    dispatch({ type: GET_CART, payload: result.data }); //payload={,}
  } catch (error) {
    dispatch({
      type: FAIL_CART,
      payload: error.response,
    });
  }
};

export const postCart = (product) => async (dispatch) => {
  const config = {
    headers: { Authorization: localStorage.getItem("token") },
  };
  try {
    await axios.post("/api/cart", product, config);
    dispatch(getCart());
  } catch (error) {
    dispatch({
      type: FAIL_CART,
      payload: error.response,
    });
  }
};

export const deleteItemCart = (productId) => async (dispatch) => {
  const config = {
    headers: { Authorization: localStorage.getItem("token") },
  };
  try {
    await axios.delete(`/api/cart/${productId}`, config);
    dispatch(getCart());
  } catch (error) {
    dispatch({
      type: FAIL_CART,
      payload: error.response,
    });
  }
};
