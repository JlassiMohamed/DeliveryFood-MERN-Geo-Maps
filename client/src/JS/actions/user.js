import {
  CURRENT_USER,
  FAIL_USER,
  LOAD_USER,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  VIDE_ERRORS,
  GET_USER,
} from "../actionTypes/user";

import axios from "axios";
import { toggleOrder, toggleSeller } from "./edit";
import { deleteCart, getCart } from "./cart";
import { deleteRestaurant, getRestaurant } from "./restaurant";

export const register = (newUser, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await axios.post("/api/user/signup", newUser);
    dispatch({ type: REGISTER_USER, payload: result.data }); //payload={msg , token , user}
    result.data.user.role === "user"
      ? history.push("/")
      : history.push("/addrestaurant");
  } catch (error) {
    // error.response.data.errors.map((el) => alert(el.msg));
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

export const login = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await axios.post("/api/user/signin", user);
    // console.log(result);
    dispatch({ type: LOGIN_USER, payload: result.data }); //msg , token , user
    if (result.data.user.role === "user") {
      history.push("/");
      dispatch(toggleOrder());
      dispatch(getCart());
    } else {
      history.push(`/orders/${result.data.user.restaurant._id}`);
      dispatch(toggleSeller());
      dispatch(getRestaurant(result.data.user.restaurant._id));
    }
  } catch (error) {
    // error.response.data.errors.map((el) =>
    //   setTimeout(function () {
    //     alert(el.msg);
    //   }, 3000)
    // );
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

export const currentUser = () => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    const result = await axios.get("/api/user/current", config);
    dispatch({ type: CURRENT_USER, payload: result.data });
    if (result.data.role === "seller") {
      dispatch(toggleSeller());
      dispatch(getRestaurant(result.data.restaurant));
    } else {
      dispatch(toggleOrder());
      dispatch(getCart());
    }
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};

export const getUser = () => async (dispatch) => {
  const config = {
    headers: { Authorization: localStorage.getItem("token") },
  };
  try {
    let result = await axios.get(`/api/user`, config);
    console.log(result);
    dispatch({ type: GET_USER, payload: result.data }); //payload={message:"",user:{}}
  } catch (error) {
    dispatch({
      type: FAIL_USER,
      payload: error.response,
    });
  }
};

export const resetPassword = (passwords, history) => async (dispatch) => {
  const config = {
    headers: { Authorization: localStorage.getItem("token") },
  };
  try {
    await axios.put(`/api/user/reset`, passwords, config);
    history.push("/signin");
    dispatch(logout());
  } catch (error) {
    dispatch({
      type: FAIL_USER,
      payload: error.response,
    });
  }
};

export const editUser = (newContact) => async (dispatch) => {
  const config = {
    headers: { Authorization: localStorage.getItem("token") },
  };
  try {
    await axios.put(`/api/user`, newContact, config);
    dispatch(getUser());
  } catch (error) {
    dispatch({
      type: FAIL_USER,
      payload: error.response,
    });
  }
};

export const deleteUser = (history) => async (dispatch) => {
  const config = {
    headers: { Authorization: localStorage.getItem("token") },
  };
  try {
    let result = await axios.get(`/api/user`, config);
    result.data.user.role === "user"
      ? dispatch(deleteCart())
      : dispatch(deleteRestaurant(result.data.user.restaurant));
    await axios.delete(`/api/user`, config);
    history.push("/signup");
    dispatch(logout());
  } catch (error) {
    dispatch({
      type: FAIL_USER,
      payload: error.response,
    });
  }
};

export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const videErrors = () => {
  return {
    type: VIDE_ERRORS,
  };
};
