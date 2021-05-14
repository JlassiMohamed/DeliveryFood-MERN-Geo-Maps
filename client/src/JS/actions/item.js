import axios from "axios";
import {
  FAIL_ITEMS,
  GET_ITEM,
  GET_ITEMS,
  LOAD_ITEMS,
} from "../actionTypes/item";

export const getItems = () => async (dispatch) => {
  dispatch({ type: LOAD_ITEMS });
  try {
    let result = await axios.get("/api/item");
    // console.log(result);
    dispatch({ type: GET_ITEMS, payload: result.data }); //payload={,}
  } catch (error) {
    dispatch({ type: FAIL_ITEMS, payload: error.response });
  }
};

export const postItem = (newItem) => async (dispatch) => {
  const config = {
    headers: { Authorization: localStorage.getItem("token") },
  };
  try {
    await axios.post("/api/item", newItem, config);
    dispatch(getItems());
  } catch (error) {
    dispatch({
      type: FAIL_ITEMS,
      payload: error.response,
    });
  }
};

export const editItem = (id, item) => async (dispatch) => {
  const config = {
    headers: { Authorization: localStorage.getItem("token") },
  };
  try {
    await axios.put(`/api/item/${id}`, item, config);
    dispatch(getItems());
  } catch (error) {
    dispatch({
      type: FAIL_ITEMS,
      payload: error.response,
    });
  }
};

export const deleteItem = (id) => async (dispatch) => {
  const config = {
    headers: { Authorization: localStorage.getItem("token") },
  };
  try {
    await axios.delete(`/api/item/${id}`, config);
    dispatch(getItems());
  } catch (error) {
    dispatch({
      type: FAIL_ITEMS,
      payload: error.response,
    });
  }
};

export const getItem = (id) => async (dispatch) => {
  try {
    let result = await axios.get(`/api/item/${id}`);
    // console.log(result);
    dispatch({ type: GET_ITEM, payload: result.data }); //payload={,}
  } catch (error) {
    dispatch({
      type: FAIL_ITEMS,
      payload: error.response,
    });
  }
};
