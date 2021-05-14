import {
  FAIL_ORDERS,
  GET_ORDERS,
  GET_ORDER,
  LOAD_ORDERS,
} from "../actionTypes/order";

const initialState = {
  errors: null,
  load: false,
  orders: [],
  order: {},
};

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_ORDERS:
      return { ...state, load: true };
    case GET_ORDERS:
      return { ...state, load: false, orders: payload.orders };
    case GET_ORDER:
      return { ...state, load: false, order: payload.order };
    case FAIL_ORDERS:
      return { ...state, load: false, errors: payload };
    default:
      return state;
  }
};

export default orderReducer;
