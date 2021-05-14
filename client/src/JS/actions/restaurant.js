import {
  LOAD_RESTAURANTS,
  FAIL_RESTAURANTS,
  GET_RESTAURANTS,
  GET_RESTAURANT,
} from "../actionTypes/restaurant";
import axios from "axios";
import { toggleSeller } from "./edit";

export const getRestaurants = () => async (dispatch) => {
  dispatch({ type: LOAD_RESTAURANTS });
  try {
    let result = await axios.get("/api/restaurant");
    // console.log(result);
    dispatch({ type: GET_RESTAURANTS, payload: result.data }); //payload={,}
  } catch (error) {
    dispatch({ type: FAIL_RESTAURANTS, payload: error.response });
  }
};

export const addRestaurant = (newRestaurant, history) => async (dispatch) => {
  const config = {
    headers: { Authorization: localStorage.getItem("token") },
  };
  try {
    let res = await axios.post("/api/restaurant", newRestaurant, config); //{restaurant:{_id}}
    // console.log(res);
    history.push(`/seller/dashboard/${res.data.restaurant._id}`);
    dispatch(toggleSeller());
    // dispatch(getRestaurants()); // !!!! no need, and second dispatch might cause problems
  } catch (error) {
    dispatch({
      type: FAIL_RESTAURANTS,
      payload: error.response,
    });
  }
};

export const editRestaurant = (id, restaurant, history) => async (dispatch) => {
  try {
    let res = await axios.put(`/api/restaurant/${id}`, restaurant);
    dispatch(getRestaurants());
    history.push(`/seller/dashboard/${res.data.restaurant._id}`);
  } catch (error) {
    dispatch({
      type: FAIL_RESTAURANTS,
      payload: error.response,
    });
  }
};

export const deleteRestaurant = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/restaurant/${id}`);
    dispatch(getRestaurants());
  } catch (error) {
    dispatch({
      type: FAIL_RESTAURANTS,
      payload: error.response,
    });
  }
};

export const getRestaurant = (id) => async (dispatch) => {
  try {
    let result = await axios.get(`/api/restaurant/${id}`);
    // console.log(result);
    dispatch({ type: GET_RESTAURANT, payload: result.data }); //payload={,}
  } catch (error) {
    dispatch({
      type: FAIL_RESTAURANTS,
      payload: error.response,
    });
  }
};

