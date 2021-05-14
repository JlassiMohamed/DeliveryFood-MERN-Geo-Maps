import { FAIL_CART, GET_CART, LOAD_CART } from "../actionTypes/cart";

const initialState = {
  cart: {},
  load: false,
  errors: null,
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_CART:
      return { ...state, load: true };
    case GET_CART:
      return { ...state, load: false, cart: payload.cart };
    case FAIL_CART:
      return { ...state, load: false, errors: payload };
    default:
      return state;
  }
};

// import { ADD_TO_CART, REMOVE_FROM_CART } from "../actionTypes/cart";
// const initialState = {
//   cartItems: [],
// };
// const cartReducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case ADD_TO_CART:
//       const item = payload;
//       const existItem = state.cartItems.find((x) => x._id === item._id);
//       if (existItem) {
//         return {
//           ...state,
//           cartItems: state.cartItems.map((x) =>
//             x._id === existItem._id ? item : x
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           cartItems: [...state.cartItems, item],
//         };
//       }
//     case REMOVE_FROM_CART:
//       return {
//         ...state,
//         cartItems: state.cartItems.filter((x) => x._id !== payload),
//       };
//     default:
//       return state;
//   }
// };

export default cartReducer;
