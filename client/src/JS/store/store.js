import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const cartItemsInLocalStorage = localStorage.getItem("cart")
//   ? JSON.parse(localStorage.getItem("cart"))
//   : [];
// const INITIAL_STATE = {
//   cartReducer: {
//     cartItems: cartItemsInLocalStorage,
//   },
// };

export const store = createStore(
  rootReducer,
  // INITIAL_STATE,
  composeEnhancer(applyMiddleware(thunk))
);
