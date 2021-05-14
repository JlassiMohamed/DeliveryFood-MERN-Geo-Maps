import axios from "axios";
import {
  FAIL_ORDERS,
  GET_ORDERS,
  GET_ORDER,
  LOAD_ORDERS,
} from "../actionTypes/order";

export const checkout = (userId, history) => async (dispatch) => {
  // const config = {
  //   headers: { Authorization: localStorage.getItem("token") },
  // };
  try {
    await axios.post(`/api/order/${userId}`); //, config
    history.push("/myorders");
    dispatch(get_my_orders());
  } catch (error) {
    dispatch({
      type: FAIL_ORDERS,
      payload: error.response,
    });
  }
};

export const get_my_orders = () => async (dispatch) => {
  const config = {
    headers: { Authorization: localStorage.getItem("token") },
  };
  dispatch({ type: LOAD_ORDERS });
  try {
    let result = await axios.get("/api/order", config);
    dispatch({ type: GET_ORDERS, payload: result.data }); //payload={orders,}
  } catch (error) {
    dispatch({ type: FAIL_ORDERS, payload: error.response });
  }
};

// !!!!only user can get it from req.user and not req.params!!!!
export const get_order = (orderId) => async (dispatch) => {
  const config = {
    headers: { Authorization: localStorage.getItem("token") },
  };
  dispatch({ type: LOAD_ORDERS });
  try {
    let result = await axios.get(`/api/order/${orderId}`, config);
    // console.log(result);
    dispatch({ type: GET_ORDER, payload: result.data }); //payload={order,}
  } catch (error) {
    dispatch({ type: FAIL_ORDERS, payload: error.response });
  }
};

export const get_seller_orders = (restaurantId) => async (dispatch) => {
  const config = {
    headers: { Authorization: localStorage.getItem("token") },
  };
  dispatch({ type: LOAD_ORDERS });
  try {
    let result = await axios.get(`/api/order/seller/${restaurantId}`, config);
    dispatch({ type: GET_ORDERS, payload: result.data }); //payload={orders,}
  } catch (error) {
    dispatch({ type: FAIL_ORDERS, payload: error.response });
  }
};

export const update_my_order_status =
  (userId, orderId, status) => async (dispatch) => {
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    try {
      await axios.put(`/api/order/user/${userId}/${orderId}`, status, config); //
      dispatch(get_my_orders());
    } catch (error) {
      dispatch({
        type: FAIL_ORDERS,
        payload: error.response,
      });
    }
  };

export const handle_orders_status =
  (restaurantId, orderId, status) => async (dispatch) => {
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    try {
      await axios.put(`/api/order/${restaurantId}/${orderId}`, status, config);
      dispatch(get_seller_orders());
    } catch (error) {
      dispatch({
        type: FAIL_ORDERS,
        payload: error.response,
      });
    }
  };

export const removeOrder = (orderId) => async (dispatch) => {
  const config = {
    headers: { Authorization: localStorage.getItem("token") },
  };
  try {
    await axios.delete(`/api/item/${orderId}`, config);
    dispatch(get_seller_orders());
    // dispatch(get_my_orders());
  } catch (error) {
    dispatch({
      type: FAIL_ORDERS,
      payload: error.response,
    });
  }
};
